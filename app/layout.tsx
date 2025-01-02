import { ClerkProvider } from "@clerk/nextjs"
import type { Metadata } from "next"
import { EB_Garamond, Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import "./globals.css"

import { Providers } from "@/features/providers"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "Ping Bonzo",
  description: "Ping Discord",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

// signInFallbackRedirectUrl="/welcome"
// signUpFallbackRedirectUrl="/welcome"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn(inter.variable, eb_garamond.variable)}>
        <body className="min-h-[calc(100vh-1px)] flex flex-col font-sans bg-brand-50 text-brand-950 antialiased">
          <main className="relative flex-1 flex flex-col">
            <Providers>{children}</Providers>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
