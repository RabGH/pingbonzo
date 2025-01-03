import { notFound } from "next/navigation"
import { currentUser } from "@clerk/nextjs/server"

import { DashboardPage } from "@/features/dashboard-page"
import { CategoryPageContent } from "./category-page-content"
import { db } from "@/db"

interface PageProps {
  params: Promise<{ name: string | undefined }>
}

const Page = async ({ params }: PageProps) => {
  const { name } = await params
  if (typeof params !== "string") return notFound()

  const auth = await currentUser()

  if (!auth) {
    return notFound()
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
  })

  if (!user) return notFound()

  const category = await db.eventCategory.findUnique({
    where: {
      name_userId: {
        name: name ?? "",
        userId: user.id,
      },
    },
    include: {
      _count: {
        select: {
          events: true,
        },
      },
    },
  })

  if (!category) return notFound()

  const hasEvents = category._count.events > 0

  return (
    <DashboardPage title={`${category.emoji} ${category.name} events`}>
      <CategoryPageContent hasEvents={hasEvents} category={category} />
    </DashboardPage>
  )
}

export default Page
