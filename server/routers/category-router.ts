import { db } from "@/db"
import { router } from "@/server/__internals/router"
import { privateProcedure } from "@/server/procedures"
import { startOfMonth } from "date-fns"

export const catgoryRouter = router({
  // Fetch categories for the authenticated user, selecting specific fields and ordering them by updatedAt in descending order
  getEventCategories: privateProcedure.query(async ({ c, ctx }) => {
    const categories = await db.eventCategory.findMany({
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
          db.event.findFirst({
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

    return c.superjson({ categories: categoriesWithCounts })
  }),
})

// fields Attribute: The fields attribute in the Event model is of type Json, which allows it to store arbitrary JSON data. The select: { fields: true } clause specifies that only this attribute should be included in the result.

// Set: A Set in JavaScript/TypeScript is a collection of unique values. Using a Set ensures that each field name is counted only once, even if it appears in multiple events.
