"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface VerticalPaginationProps {
  sections: string[]
}

export function VerticalPagination({ sections }: VerticalPaginationProps) {
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  return (
    <div className="vertical-pagination">
      {sections.map((section) => (
        <Link key={section} href={`#${section}`}>
          <div 
            className={`dot ${activeSection === section ? 'active' : ''}`} 
            title={section.charAt(0).toUpperCase() + section.slice(1)}
          />
        </Link>
      ))}
    </div>
  )
} 