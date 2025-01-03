import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
})

// create product on stripe and get price ID in return
export const createCheckoutSession = async ({
  userEmail,
  userId,
}: {
  userEmail: string
  userId: string
}) => {
  try {
    console.log("Creating checkout session for user:", userId)
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1QcwyEPV8ypyaNXi1yhurZH1",
          quantity: 1,
        },
      ], // what is the user buying
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
      customer_email: userEmail,
      metadata: {
        userId,
      },
    })
    console.log("Checkout session created:", session.id)
    return session
  } catch (error) {
    console.error("Error creating checkout session:", error)
    throw new Error("Failed to create checkout session")
  }
}
