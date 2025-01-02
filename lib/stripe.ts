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
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: "price_1QcwyEPV8ypyaNXi1yhurZH1",
        quantity: 1,
      },
    ], // what is the user buying
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
    customer_email: userEmail,
    metadata: {
      userId,
    },
  })

  return session
}
