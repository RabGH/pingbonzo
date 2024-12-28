import { ClerkProvider } from "@clerk/nextjs"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import type { Metadata } from "next"
import { EB_Garamond, Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import "./globals.css"

import { Providers } from "@/components/providers"

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn(inter.variable, eb_garamond.variable)}>
        <body className="font-sans bg-brand-50 text-brand-950 antialiased">
          <Providers>
            <ReactQueryDevtools />
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
