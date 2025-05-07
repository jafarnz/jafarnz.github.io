import type { Metadata } from 'next'
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import type React from "react" // Import React
import { Providers } from "@/app/providers"
import { Cursor } from "@/components/cursor"
import { Navigation } from "@/components/navigation"
/* eslint-disable @typescript-eslint/no-unused-vars */

const geistSans = GeistSans
const geistMono = GeistMono

// Default Metadata
export const metadata: Metadata = {
  title: 'Jafar Niaz - Full Stack Developer Portfolio',
  description: 'Portfolio showcasing projects and skills of Jafar Niaz, a full stack developer specializing in Next.js, React, and more. Explore TPConnect, SwyftViewer, Swyft, and other projects.',
  openGraph: {
    title: 'Jafar Niaz - Full Stack Developer Portfolio',
    description: 'Explore the projects and skills of Jafar Niaz.',
    url: 'https://jafarnz.me', // Updated to use HTTPS with actual domain
    siteName: 'Jafar Niaz Portfolio',
    images: [
      {
        url: 'https://jafarnz.me/PortfolioPreview.png', // Updated to absolute URL with HTTPS
        width: 1200, // Recommended Open Graph image size
        height: 630,
        alt: 'Jafar Niaz Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  // Optional: Add Twitter specific card details if desired
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Jafar Niaz - Full Stack Developer Portfolio',
  //   description: 'Explore the projects and skills of Jafar Niaz.',
  //   creator: '@yourtwitterhandle', // Add your Twitter handle if you have one
  //   images: ['/PortfolioPreview.png'], // Must be an absolute URL in production
  // },
  // Optional: Add other metadata like keywords, viewport, etc.
  // keywords: ['Jafar Niaz', 'Portfolio', 'Full Stack Developer', 'Next.js', 'React', 'TypeScript', 'Web Development'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.variable} suppressHydrationWarning>
      <body>
        <Providers>
          <Cursor />
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  )
}

