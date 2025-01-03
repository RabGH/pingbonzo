import { addMonths, startOfMonth } from "date-fns"
import { z } from "zod"

import { router } from "@/server/__internals/router"
import { privateProcedure } from "@/server/procedures"

import { FREE_QUOTA, PRO_QUOTA } from "@/config"

export const projectRouter = router({
  getUsage: privateProcedure.query(async ({ c, ctx }) => {
    const { user } = ctx

    const currentDate = startOfMonth(new Date())

    const quota = await ctx.db.quota.findFirst({
      where: {
        userId: user.id,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
      },
    })

    const eventCount = quota?.count ?? 0 // nullish coalescing operator

    const categoryCount = await ctx.db.eventCategory.count({
      where: {
        userId: user.id,
      },
    })

    const limits = user.plan === "PRO" ? PRO_QUOTA : FREE_QUOTA

    const resetDate = addMonths(currentDate, 1)

    return c.superjson({
      categoriesUsed: categoryCount,
      categoriesLimit: limits.maxEventCategories,
      eventsUsed: eventCount,
      eventsLimit: limits.maxEventsPerMonth,
      resetDate,
    })
  }),

  setDiscordId: privateProcedure
    .input(z.object({ discordId: z.string().max(20) }))
    .mutation(async ({ c, ctx, input }) => {
      const { user } = ctx
      const { discordId } = input

      await ctx.db.user.update({
        where: { id: user.id },
        data: { discordId },
      })

      return c.json({ success: true })
    }),

  setApiKey: privateProcedure
    .input(z.object({ apiKey: z.string() }))
    .mutation(async ({ c, ctx, input }) => {
      const { user } = ctx
      const { apiKey } = input

      await ctx.db.user.update({
        where: { id: user.id },
        data: { apiKey },
      })

      return c.json({ success: true })
    }),
})
