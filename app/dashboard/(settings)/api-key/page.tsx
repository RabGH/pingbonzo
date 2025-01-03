import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { DashboardPage } from "@/features/dashboard-page"

import { db } from "@/db"
import ApiKeySettings from "./api-key-settings"

const SettingsPage = async () => {
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
  // apiKey={user.apiKey ?? ""}
  return (
    <DashboardPage title="API Key Settings">
      <ApiKeySettings />
    </DashboardPage>
  )
}

export default SettingsPage
