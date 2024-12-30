import { router } from "@/server/__internals/router"
import { privateProcedure } from "@/server/procedures"

export const catgoryRouter = router({
  getEventCategories: privateProcedure,
})
