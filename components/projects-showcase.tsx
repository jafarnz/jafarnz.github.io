/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

const projects = [
  {
    id: "tpconnect",
    title: "TPConnect.xyz",
    description: "A platform for Temasek Polytechnic students to connect",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wlADsDHPTrHlHfS2qot1SjgfsQafWZ.png",
    color: "#FF4B4B",
  },
  {
    id: "swyftbiz",
    title: "swyftbiz",
    description: "Professional UI design for a SaaS management platform.",
    image: "./SwyftBiz1.png",
    color: "#000000",
  },
  {
    id: "swyft",
    title: "Swyft",
    description: "Official portfolio for SwyftSolutions",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/swyft-high-resolution-logo-aMMZLDGdUE50vdd4igHorbpC9Y5TLg.png",
    color: "#4B4BFF",
  },
  {
  id:"swyftviewer",
  title: "SwyftViewer",
  description: "Professional-grade financial analytics platform for tracking cryptocurrencies and stocks in real-time.",
  image: "./SwyftViewerImage1.png",
  color: "#00FF88",
  }
]

export function ProjectsShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="grid gap-8">
      {projects.map((project, index) => (
        <Link href={`/projects/${project.id}`} key={project.id}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="group relative h-[60vh] overflow-hidden rounded-lg bg-zinc-900"
          >
            <motion.div
              className="absolute inset-0 z-0"
              animate={{
                scale: hoveredIndex === index ? 1.1 : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="h-full w-full object-cover opacity-50"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="max-w-2xl text-center">
                <motion.h3
                  className="mb-4 text-4xl font-bold"
                  animate={{
                    y: hoveredIndex === index ? -20 : 0,
                  }}
                >
                  {project.title}
                </motion.h3>
                <motion.p
                  className="text-lg text-gray-300"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? 0 : 20,
                  }}
                >
                  {project.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  )
}

