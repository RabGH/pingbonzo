import { db } from "@/db"
import { router } from "@/server/__internals/router"
import { publicProcedure } from "@/server/procedures"
import { currentUser } from "@clerk/nextjs/server"

// export const dynamic = "force-dynamic"

export const authRouter = router({
  getDatabaseSyncStatus: publicProcedure.query(async ({ c, ctx }) => {
    const auth = await currentUser()

    if (!auth) {
      return c.json({ isSynced: false })
    }

    const user = await db.user.findFirst({
      where: { externalId: auth.id },
      // cache: { id: `user-${auth.id}`, ttl: 3600 } // TTL in seconds
    })

    if (!user) {
      await db.user.create({
        data: {
          quotaLimit: 100,
          externalId: auth.id,
          email: auth.emailAddresses[0].emailAddress,
        },
      })
    }

    return c.json({ isSynced: true }, 200)
  }),
})
