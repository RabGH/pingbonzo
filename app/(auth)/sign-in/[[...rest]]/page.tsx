"use client"

import { SignIn } from "@clerk/nextjs"
// afterSignInUrl="/welcome"
const Page = () => {
  return (
    <div className="w-full flex-1 flex items-center justify-center">
      <SignIn />
    </div>
  )
}

export default Page
