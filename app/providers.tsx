"use client"

import { ThemeProvider } from "next-themes"
import { MotionConfig } from "framer-motion"
import type React from "react" // Added import for React

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} forcedTheme="dark">
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  )
}

