import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"

import { db } from "@/db"
import { DashboardPage } from "@/components/dashboard-page"

import { DashboardPageContent } from "./dashboard-page-content"

// dashboard server page
const DashboardSPage = async () => {
  const auth = await currentUser()

  if (!auth) {
    redirect("/sign-in")
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <DashboardPage title="Dashboard">
      <DashboardPageContent />
    </DashboardPage>
  )
}

export default DashboardSPage
