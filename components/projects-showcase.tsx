/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: "tpconnect",
    title: "tpconnect.xyz",
    description: "a platform for temasek polytechnic students to connect",
    image: "/TPConnectImage1.png",
    color: "#d14d84",
    url: "https://tpconnect.xyz"
  },
  {
    id: "jafspaper",
    title: "jaf's blog",
    description: "my personal blog for sharing thoughts on tech and development",
    image: "/blog.png",
    color: "#604065",
    url: "https://jafspaper.vercel.app/"
  },
  {
    id: "swyft",
    title: "swyft",
    description: "official portfolio for swyft solutions",
    image: "/SwyftLogoAllPages.webp",
    color: "#eacce6",
    url: "https://swyft.vercel.app/"
  },
  {
    id: "ningstudios",
    title: "ning studios",
    description: "creative portfolio for digital artist ning",
    image: "/ning-studios-preview.png",
    color: "#d14d84",
    url: "https://ningstudios.vercel.app/"
  },
  {
    id: "lastfm-scrobbler",
    title: "cunty scrobbler (last.fm)",
    description: "a python-based last.fm scrobbler with a yassified ui, built for a client wanting a girly and functional solution.",
    image: "/LastFMScrobblerImage1.png",
    color: "#FF69B4",
    url: "https://github.com/jafarnz/lastfmscrobbler-py/releases/tag/slay"
  }
]

export function ProjectsShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <Link 
          key={project.id}
          href={`/projects/${project.id}`}
          rel="noopener noreferrer"
          className="block transform transition-transform hover:-translate-y-1"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="group relative h-[300px] overflow-hidden rounded-2xl shadow-md cursor-pointer"
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
                className="h-full w-full object-cover opacity-70"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#604065]/80 via-[#604065]/50 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className="max-w-2xl text-center">
                <motion.h3
                  className="mb-4 text-3xl font-bold text-white lowercase flex items-center justify-center gap-2"
                  animate={{
                    y: hoveredIndex === index ? -10 : 0,
                  }}
                >
                  {project.title}
                  <ArrowUpRight className="h-5 w-5 inline-block opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.h3>
                <motion.p
                  className="text-sm text-[#f9f4fb] lowercase"
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

            {/* Visit button that shows on hover */}
            <motion.div 
              className="absolute bottom-4 right-4"
              initial={{ opacity: 0 }}
              animate={{
                opacity: hoveredIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <span className="bg-white text-[#604065] px-3 py-1.5 rounded-full text-sm font-medium shadow-md flex items-center gap-1">
                visit <ArrowUpRight className="h-3 w-3" />
              </span>
            </motion.div>
          </motion.div>
        </Link>
      ))}
    </div>
  )
}

