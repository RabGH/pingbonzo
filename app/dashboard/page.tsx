import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"
import { PlusIcon } from "lucide-react"

import { db } from "@/db"
import { createCheckoutSession } from "@/lib/stripe"
import { DashboardPage } from "@/features/dashboard-page"

import { DashboardPageContent } from "./dashboard-page-content"

import CreateEventCategoryModal from "@/features/create-event-category-modal"
import { PaymentSuccessModal } from "@/features/payment-success-modal"
import { Button } from "@/components/ui/button"

interface MainDashboardPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// dashboard server page
const MainDashboardPage = async ({ searchParams }: MainDashboardPageProps) => {
  const { intent, success } = await searchParams
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

  if (intent === "upgrade") {
    const session = await createCheckoutSession({
      userEmail: user.email,
      userId: user.id,
    })

    if (session.url) {
      return redirect(session.url)
    }
  }

  return (
    <>
      {success ? <PaymentSuccessModal /> : null}
      <DashboardPage
        hideBackButton={true}
        cta={
          <CreateEventCategoryModal>
            <Button className="w-full sm:w-fit">
              <PlusIcon className="size-4 mr-2" />
              Add Category
            </Button>
          </CreateEventCategoryModal>
        }
        title="Dashboard"
      >
        <DashboardPageContent />
      </DashboardPage>
    </>
  )
}

export default MainDashboardPage
