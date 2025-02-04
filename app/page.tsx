"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion"
import { ParticlesContainer } from "@/components/particles"
import { SkillsCloud } from "@/components/skills-cloud"
import { ProjectsShowcase } from "@/components/projects-showcase"
import Image from "next/image"

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

export default function Home() {
  const ref = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const { scrollYProgress: skillsScrollProgress } = useScroll({
    target: skillsRef,
    offset: ["start end", "end start"],
  })

  const { scrollYProgress: projectsScrollProgress } = useScroll({
    target: projectsRef,
    offset: ["start end", "end start"],
  })

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const smoothProgress = useSpring(scrollYProgress, springConfig)
  const smoothSkillsProgress = useSpring(skillsScrollProgress, springConfig)
  const smoothProjectsProgress = useSpring(projectsScrollProgress, springConfig)

  const y = useParallax(smoothProgress, 300)
  const skillsY = useParallax(smoothSkillsProgress, 100)
  const projectsY = useParallax(smoothProjectsProgress, 100)

  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0])
  const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.8])

  return (
    <main className="relative min-h-screen" ref={ref}>
      <ParticlesContainer />

      <motion.section 
        style={{ opacity, scale }} 
        className="relative flex min-h-screen items-center justify-center pt-24"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="mb-6 text-6xl font-bold tracking-tighter md:text-8xl">Jafar Niaz</h1>
            <p className="mb-8 text-xl text-gray-400">Full Stack Developer | Temasek Polytechnic</p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
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
        style={{ y: skillsY }}
        className="py-32"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-16 text-center text-4xl font-bold">Skills & Technologies</h2>
            <SkillsCloud />
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        ref={projectsRef}
        style={{ y: projectsY }}
        className="py-32"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-16 text-center text-4xl font-bold">Featured Projects</h2>
            <ProjectsShowcase />
          </motion.div>
        </div>
      </motion.section>
    </main>
  )
}

