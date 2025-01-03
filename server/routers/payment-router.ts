import { createCheckoutSession } from "@/lib/stripe"
import { router } from "../__internals/router"
import { privateProcedure } from "../procedures"

type CreateCheckoutSessionResponse = { url: string | null } | { error: string }

export const paymentRouter = router({
  createCheckoutSession: privateProcedure.mutation(async ({ c, ctx }) => {
    try {
      const { user } = ctx

      const session = await createCheckoutSession({
        userEmail: user.email,
        userId: user.id,
      })

      return c.json({ url: session.url } as CreateCheckoutSessionResponse)
    } catch (error) {
      console.error("Error in createCheckoutSession mutation:", error)
      return c.json(
        {
          error: "Failed to create checkout session",
        } as CreateCheckoutSessionResponse,
        500
      )
    }
  }),

  getUserPlan: privateProcedure.query(async ({ c, ctx }) => {
    const { user } = ctx
    return c.json({ plan: user.plan })
  }),
})
