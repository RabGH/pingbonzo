"use client"

import { SignUp } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"

const Page = () => {
  const searchParams = useSearchParams()
  const intent = searchParams.get("intent")
  return (
    <div className="w-full flex-1 flex items-center justify-center">
      <SignUp
        fallbackRedirectUrl={intent ? `/welcome?intent=${intent}` : "/welcome"}
        forceRedirectUrl={intent ? `/welcome?intent=${intent}` : "/welcome"}
      />
    </div>
  )
}

export default Page
