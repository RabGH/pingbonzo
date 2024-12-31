import { Pool } from "@neondatabase/serverless"
import { PrismaNeon } from "@prisma/adapter-neon"
import { PrismaClient } from "@prisma/client"
import { Redis } from "@upstash/redis/cloudflare"
import { env } from "hono/adapter"
import { currentUser } from "@clerk/nextjs/server"
import { HTTPException } from "hono/http-exception" // handles errors

import { db } from "@/db"
import { j } from "@/server/__internals/j"
import { cacheExtension } from "@/server/__internals/db/cache-extension"

/**
 * Middleware for providing a built-in cache with your Prisma database.
 *
 * You can remove this if you don't like it, but caching can massively speed up your database queries.
 * This is what ctx our own context uses as middleware
 */

const extendedDatabaseMiddleware = j.middleware(async ({ c, next }) => {
  const variables = env(c)

  const pool = new Pool({
    connectionString: variables.DATABASE_URL,
  })

  const adapter = new PrismaNeon(pool)

  const redis = new Redis({
    token: variables.REDIS_TOKEN,
    url: variables.REDIS_URL,
  })

  const db = new PrismaClient({
    adapter,
  }).$extends(cacheExtension({ redis }))

  // Whatever you put inside of `next` is accessible to all following middlewares
  return await next({ db })
})

const authMiddleware = j.middleware(async ({ c, next }) => {
  // Attempt 1: Check for the Authorization header (e.g., "Bearer <API_KEY>")
  const authHeader = c.req.header("Authorization") // Get the header from the request

  if (authHeader) {
    const apiKey = authHeader.split(" ")[1] // Extract the API_KEY part after "Bearer"
    const user = await db.user.findUnique({ where: { apiKey } }) // Check if this API_KEY exists in the database

    if (user) {
      return next({ user }) // If a matching user is found, pass the user to the next middleware
    }
  }

  // Attempt 2: Use Clerk's currentUser (logged-in user from the frontend session)
  const auth = await currentUser() // Fetch the logged-in user via Clerk
  if (!auth) {
    throw new HTTPException(401, { message: "Unauthorized" }) // If no user is logged in, return 401
  }

  // Match the Clerk user with the user in the database
  const user = await db.user.findUnique({ where: { externalId: auth.id } }) // Match Clerk's user ID with the database's externalId
  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized" }) // If no matching user, return 401
  }

  // Pass the authenticated user to the next middleware
  return next({ user })
})

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const baseProcedure = j.procedure
export const publicProcedure = baseProcedure.use(extendedDatabaseMiddleware)
export const privateProcedure = publicProcedure.use(authMiddleware)

// c is provided by hono, query is get, mutation is a post.
// ctx context, difference is c (hono context) ctx is a custom one (describes the stuff we pass down from prev middlewares)
// if we destructure ctx, which we have db and user. Anything that we return from the next function previous middlewares, that run before this endpoint. Like the auth does for the private procedure in procedures.
