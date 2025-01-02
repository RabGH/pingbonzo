import { Hono } from "hono"
import { cors } from "hono/cors"
import { handle } from "hono/vercel"

import { authRouter } from "@/server/routers/auth-router"
import { catgoryRouter } from "@/server/routers/category-router"
import { paymentRouter } from "@/server/routers/payment-router"
import { projectRouter } from "@/server/routers/project-router"

const app = new Hono().basePath("/api").use(cors())

/**
 * This is the primary router for your server.
 *
 * All routers added in /server/routers should be manually added here.
 */
const appRouter = app
  .route("/auth", authRouter)
  .route("/category", catgoryRouter)
  .route("/payment", paymentRouter)
  .route("/project", projectRouter)

// The handler Next.js uses to answer API requests
export const httpHandler = handle(app)

/**
 * (Optional)
 * Exporting our API here for easy deployment
 *
 * Run `npm run deploy` for one-click API deployment to Cloudflare's edge network
 */
export default app

// export type definition of API
export type AppType = typeof appRouter
