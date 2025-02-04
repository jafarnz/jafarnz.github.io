import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Providers } from "./providers"
import { Cursor } from "@/components/cursor"
import { Navigation } from "@/components/navigation"
import "./globals.css"
import type React from "react" // Import React
/* eslint-disable @typescript-eslint/no-unused-vars */

const geistSans = GeistSans
const geistMono = GeistMono

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
      <body className={`${geistSans.className} bg-black text-white`}>
        <Providers>
          <Cursor />
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  )
}

