import Link from "next/link"
import { SignOutButton } from "@clerk/nextjs"

import MaxWidthWrapper from "@/components/max-width-wrapper"
import { Button, buttonVariants } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const Navbar = () => {
  const user = true

  return (
    <nav className="sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <Link href={"/"} className="flex z-40 font-semibold">
            Ping <span className="text-brand-700">Bonzo</span>
          </Link>
          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <SignOutButton>
                  <Button size={"sm"} variant={"ghost"} className="">
                    Sign Out
                  </Button>
                </SignOutButton>

                <Link
                  href={"/dashboard"}
                  className={buttonVariants({
                    size: "sm",
                    className: "flex items-center gap-1",
                  })}
                >
                  Dashboard <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}
