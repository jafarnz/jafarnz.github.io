"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin } from "lucide-react"

export function Navigation() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-black/50 backdrop-blur-md"
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/SwyftNavBar.webp"
            alt="Swyft Logo"
            width={120}
            height={48}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/jafarnz"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white/10 p-2 transition-all hover:bg-white/20"
            aria-label="GitHub Profile"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/jafar-niaz-27523231b/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white/10 p-2 transition-all hover:bg-white/20"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </nav>
    </motion.header>
  )
}

