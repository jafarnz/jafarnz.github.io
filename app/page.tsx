"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ParticlesContainer } from "@/components/particles"
import { SkillsCloud } from "@/components/skills-cloud"
import { ProjectsShowcase } from "@/components/projects-showcase"
import Image from "next/image"

export default function Home() {
  const ref = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)

  // Ensure page starts at top on load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { scrollYProgress } = useScroll()

  const { scrollYProgress: skillsScrollProgress } = useScroll({
    target: skillsRef,
    offset: ["0 1", "0.5 0.5"]
  })

  const { scrollYProgress: projectsScrollProgress } = useScroll({
    target: projectsRef,
    offset: ["0 1", "0.5 0.5"]
  })

  // Spring configs for smoother animations
  const springConfig = { stiffness: 70, damping: 15, restDelta: 0.001 }
  const smoothProgress = useSpring(scrollYProgress, springConfig)
  const smoothSkillsProgress = useSpring(skillsScrollProgress, springConfig)
  const smoothProjectsProgress = useSpring(projectsScrollProgress, springConfig)

  // Hero section animations
  const heroOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0])
  const heroScale = useTransform(smoothProgress, [0, 0.25], [1, 0.8])
  const heroY = useTransform(smoothProgress, [0, 0.25], [0, -100])

  // Skills section animations
  const skillsOpacity = useTransform(smoothSkillsProgress, [0, 0.5, 1], [0, 1, 1])
  const skillsScale = useTransform(smoothSkillsProgress, [0, 0.5, 1], [0.8, 1, 1])
  const skillsY = useTransform(smoothSkillsProgress, [0, 1], [200, 0])

  // Projects section animations
  const projectsOpacity = useTransform(smoothProjectsProgress, [0, 0.5, 1], [0, 1, 1])
  const projectsScale = useTransform(smoothProjectsProgress, [0, 0.5, 1], [0.8, 1, 1])
  const projectsY = useTransform(smoothProjectsProgress, [0, 1], [200, 0])

  return (
    <main className="relative" ref={ref}>
      <ParticlesContainer />

      <motion.section 
        style={{ 
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY,
        }} 
        className="relative flex min-h-screen items-center justify-center pt-24"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="mb-6 text-6xl font-bold tracking-tighter md:text-8xl">Jafar Niaz</h1>
            <p className="mb-8 text-xl text-gray-400">Full Stack Developer | Temasek Polytechnic</p>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.8,
                delay: 0.4,
                type: "spring",
                stiffness: 100
              }}
              className="relative mx-auto h-64 w-64 overflow-hidden rounded-full border-2 border-primary md:h-96 md:w-96"
            >
              <Image
                src="/DashboardMyPic.jpeg"
                alt="Profile"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mx-auto mt-8 max-w-2xl text-lg text-gray-400"
            >
              Crafting digital experiences through web development, while exploring the intersections of technology,
              creative writing, game design, and music composition.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        ref={skillsRef}
        style={{ 
          y: skillsY,
          opacity: skillsOpacity,
          scale: skillsScale
        }}
        className="sticky top-0 py-32 min-h-screen flex items-center bg-black/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="transform-gpu"
          >
            <motion.h2 
              className="mb-16 text-center text-4xl font-bold"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Skills & Technologies
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <SkillsCloud />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        ref={projectsRef}
        style={{ 
          y: projectsY,
          opacity: projectsOpacity,
          scale: projectsScale
        }}
        className="sticky top-0 py-32 min-h-screen flex items-center bg-black/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="transform-gpu"
          >
            <motion.h2 
              className="mb-16 text-center text-4xl font-bold"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Featured Projects
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ProjectsShowcase />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  )
}

