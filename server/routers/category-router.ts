import { startOfDay, startOfMonth, startOfWeek, startOfYear } from "date-fns"
import { z } from "zod"

import { router } from "@/server/__internals/router"
import { privateProcedure } from "@/server/procedures"
import { HTTPException } from "hono/http-exception"

import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator"

import { db } from "@/db"
import { parseColor } from "@/lib/utils"

export const catgoryRouter = router({
  // Fetch categories for the authenticated user, selecting specific fields and ordering them by updatedAt in descending order
  getEventCategories: privateProcedure.query(async ({ c, ctx }) => {
    const categories = await ctx.db.eventCategory.findMany({
      where: {
        userId: ctx.user.id, // Only fetch categories belonging to the authenticated user
      },
      select: {
        id: true,
        name: true,
        emoji: true,
        color: true,
        updatedAt: true,
        createdAt: true,
      },
      orderBy: { updatedAt: "desc" },
    })

    // Process each category to count the distinct fields in events created after the first day of the month
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const now = new Date()
        const firstDayOfMonth = startOfMonth(now) // Get the first day of the current month

        // Fetch events for the category created after the first day of the month and count distinct fields
        const [uniqueFieldCount, eventsCount, lastPing] = await Promise.all([
          // promise an array of querries to happen

          //uniqueFieldCount
          db.event
            .findMany({
              where: {
                eventCategory: { id: category.id },
                createdAt: { gte: firstDayOfMonth },
              },
              select: {
                fields: true, // Only select the "fields" attribute of the events
              },
              distinct: ["fields"], // Ensure the fields are distinct
            })
            .then((events) => {
              const fieldNames = new Set<string>() // Create a new Set to store field names
              events.forEach((event) => {
                // For each event, add the field names to the Set
                Object.keys(event.fields as object).forEach((fieldName) => {
                  fieldNames.add(fieldName) // Add each field name to the Set
                })
              })

              return fieldNames.size // how many unique fields are being tracked by the user
            }),
          // count the amount of events for the month eventsCount
          db.event.count({
            where: {
              eventCategory: { id: category.id },
              createdAt: { gte: firstDayOfMonth },
            },
          }),
          // last pinged event lastPing
          ctx.db.event.findFirst({
            where: { eventCategory: { id: category.id } },
            orderBy: { createdAt: "desc" },
            select: { createdAt: true },
          }),
        ])

        return {
          ...category,
          uniqueFieldCount,
          eventsCount,
          lastPing: lastPing?.createdAt || null,
        }
      })
    )

    return c.superjson({ categories: categoriesWithCounts }) // working with dates, superjson helps
  }),
  // this is how we implement zod for post / edit / delete mutate
  deleteCategory: privateProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ c, ctx, input }) => {
      const { name } = input

      await ctx.db.eventCategory.delete({
        where: { name_userId: { name, userId: ctx.user.id } },
      })
      return c.json({ success: true }, 200)
    }),

  createEventCategory: privateProcedure
    .input(
      z.object({
        name: CATEGORY_NAME_VALIDATOR,
        color: z
          .string()
          .min(1, "Color is required")
          .regex(/^#[0-9A-F]{6}$/i, "Invalid color format."),
        emoji: z.string().emoji("Invalid emoji").optional(),
      })
    )
    .mutation(async ({ c, ctx, input }) => {
      const { user } = ctx
      const { color, name, emoji } = input

      // TODO: Add paid plan logic

      const eventCategory = await ctx.db.eventCategory.create({
        data: {
          name: name.toLowerCase(),
          color: parseColor(color),
          emoji,
          userId: user.id,
        },
      })

      return c.json({ eventCategory })
    }),

  insertQuickStartCategories: privateProcedure.mutation(async ({ ctx, c }) => {
    const categories = await ctx.db.eventCategory.createMany({
      data: [
        { name: "bug", emoji: "🐛", color: 0xff6b6b },
        { name: "sale", emoji: "💰", color: 0xffeb3b },
        { name: "question", emoji: "🤔", color: 0x6c5ce7 },
      ].map((category) => ({
        ...category,
        userId: ctx.user.id,
      })),
    })

    return c.json({ success: true, count: categories.count })
  }),

  pollCategory: privateProcedure
    .input(z.object({ name: CATEGORY_NAME_VALIDATOR }))
    .query(async ({ c, ctx, input }) => {
      const { name } = input // we get the input from the params in the frontend to keep polling for data

      const category = await db.eventCategory.findUnique({
        where: { name_userId: { name, userId: ctx.user.id } },
        include: {
          _count: {
            select: {
              events: true,
            },
          },
        },
      })

      if (!category) {
        throw new HTTPException(404, {
          message: `Category "${name}" not found`,
        })
      }

      const hasEvents = category._count.events > 0

      return c.json({ hasEvents })
    }),

  getEventsByCategoryName: privateProcedure
    .input(
      z.object({
        name: CATEGORY_NAME_VALIDATOR,
        page: z.number(),
        limit: z.number().max(50),
        timeRange: z.enum(["today", "week", "month"]),
      })
    )
    .query(async ({ c, ctx, input }) => {
      const { limit, name, page, timeRange } = input

      const now = new Date()

      let startDate: Date

      switch (timeRange) {
        case "today":
          startDate = startOfDay(now)
          break
        case "week":
          startDate = startOfWeek(now, { weekStartsOn: 0 })
          break
        case "month":
          startDate = startOfMonth(now)
          break
      }

      const [events, eventsCount, uniqueFieldCount] = await Promise.all([
        ctx.db.event.findMany({
          where: {
            eventCategory: { name, userId: ctx.user.id },
            createdAt: { gte: startDate },
          },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { createdAt: "desc" },
        }),
        ctx.db.event.count({
          where: {
            eventCategory: { name, userId: ctx.user.id },
            createdAt: { gte: startDate },
          },
        }),
        ctx.db.event
          .findMany({
            where: {
              eventCategory: { name, userId: ctx.user.id },
              createdAt: { gte: startDate },
            },
            select: {
              fields: true,
            },
            distinct: ["fields"],
          })
          .then((events) => {
            // name, email, plan for example
            const fieldNames = new Set<string>()
            events.forEach((event) => {
              Object.keys(event.fields as object).forEach((fieldName) => {
                fieldNames.add(fieldName)
              })
            })
            return fieldNames.size
          }),
      ])

      return c.superjson({
        events,
        eventsCount,
        uniqueFieldCount,
      })
    }),
})
