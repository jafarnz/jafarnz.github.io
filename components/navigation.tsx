"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Github, Linkedin } from "lucide-react"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-[#f9f4fb]/90 shadow-sm backdrop-blur-md"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="#home" className="relative z-50">
            <div className="p-2 rounded-full bg-[#f9f4fb] hover:bg-[#eacce6] transition-colors">
              <Image 
                src="/SwyftNavBar.png" 
                alt="Swyft Logo" 
                width={30} 
                height={30}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <Link 
              href="https://github.com/jafarnz" 
              target="_blank"
              rel="noopener noreferrer" 
              className="p-2 rounded-full bg-[#f9f4fb] hover:bg-[#eacce6] transition-colors"
            >
              <Github className="h-5 w-5 text-[#604065]" />
            </Link>
            
            <Link
              href="https://www.linkedin.com/in/jafar-niaz-27523231b/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-[#f9f4fb] hover:bg-[#eacce6] transition-colors"
            >
              <Linkedin className="h-5 w-5 text-[#604065]" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

