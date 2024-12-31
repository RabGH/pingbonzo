"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/heading"

interface DashboardPageProps {
  title: string
  children?: React.ReactNode
  hideBackButton?: boolean
  cta?: React.ReactNode // call to action
}

export const DashboardPage = ({
  title,
  children,
  cta,
  hideBackButton,
}: DashboardPageProps) => {
  const router = useRouter()
  return (
    <section className="flex-1 h-full w-full flex flex-col">
      <div className="p-6 sm:p-8 flex justify-between border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-8">
          {hideBackButton ? null : (
            <Button
              onClick={() => router.push("/dashboard")}
              className="w-fit bg-white"
              variant={"outline"}
            >
              <ArrowLeft className="size-4" />
            </Button>
          )}

          <Heading>{title}</Heading>

          {cta ? <div className="w-full">{cta}</div> : null}
        </div>
      </div>
      <div className="flex-1 p-6 sm:p-8 flex flex-col overflow-y-auto">
        {children}
      </div>
    </section>
  )
}
