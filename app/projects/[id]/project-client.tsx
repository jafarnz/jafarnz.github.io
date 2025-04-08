/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { TechBadge } from "@/components/tech-badge"
import type React from "react"

interface Tech {
  name: string
}

interface Project {
  title: string
  description: string
  images: string[]
  features: string[]
  tech: Tech[]
  link: string
  accent: string
}

interface ProjectClientProps {
  project: Project
}

export function ProjectClient({ project }: ProjectClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        previousImage()
      } else if (e.key === 'ArrowRight') {
        nextImage()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, []) // Empty dependency array since nextImage and previousImage don't change

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black pt-24 pb-16"
      style={
        {
          "--project-accent": project.accent,
        } as React.CSSProperties
      }
    >
      <div className="container mx-auto max-w-5xl px-4">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="grid gap-8">
          <motion.div initial={{ y: 20 }} animate={{ y: 0 }}>
            <h1 className="mb-3 text-4xl font-bold" style={{ color: project.accent }}>
              {project.title}
            </h1>
            <p className="mb-4 text-lg text-gray-400">{project.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative mx-auto aspect-[16/9] w-full max-w-2xl overflow-hidden rounded-lg"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div
              className="flex h-full w-full transition-transform duration-500"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {project.images.map((image: string, index: number) => (
                <div key={index} className="relative h-full w-full shrink-0">
                  <Image
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-contain"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>

            {/* Navigation arrows */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-4"
            >
              <button
                onClick={previousImage}
                className="rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/70"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={nextImage}
                className="rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:scale-110 hover:bg-black/70"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </motion.div>

            {/* Image counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm"
            >
              {currentImageIndex + 1} / {project.images.length}
            </motion.div>

            {/* Keyboard navigation hint */}
            <div className="absolute bottom-4 right-4 hidden gap-2 text-sm text-white/70 sm:flex">
              <kbd className="rounded bg-black/30 px-2 py-1 backdrop-blur-sm">←</kbd>
              <kbd className="rounded bg-black/30 px-2 py-1 backdrop-blur-sm">→</kbd>
            </div>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold">Key Features</h2>
              <ul className="space-y-2">
                {project.features.map((feature: string) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accent }} />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <TechBadge key={tech.name} name={tech.name} />
                ))}
              </div>
            </div>
          </div>

          {/* Conditionally style the Visit Project link based on accent color */}
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block rounded-lg px-6 py-3 font-semibold transition-transform hover:scale-105 ${project.accent === "#FFFFFF" ? "text-black" : "text-white"}`}
            style={{ backgroundColor: project.accent }}
          >
            Visit Project
          </Link>
        </div>
      </div>
    </motion.main>
  )
} 