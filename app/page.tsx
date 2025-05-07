"use client"

import { useRef, useEffect } from "react"
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion"
import { ParticlesContainer } from "@/components/particles"
import { SkillsCloud } from "@/components/skills-cloud"
import { ProjectsShowcase } from "@/components/projects-showcase"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Custom Hook for section animations
function useSectionAnimation(progress: MotionValue<number>) {
  return {
    // Adjust ranges for quicker fade/slide
    opacity: useTransform(progress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]), 
    y: useTransform(progress, [0, 0.1, 0.9, 1], [80, 0, 0, -80]), // Reduced travel distance
  }
}

export default function Home() {
  const ref = useRef(null)
  const heroRef = useRef(null)
  const blogRef = useRef(null)
  const projectsRef = useRef(null)
  const skillsRef = useRef(null)

  // Ensure page starts at top on load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { scrollYProgress: blogScrollProgress } = useScroll({
    target: blogRef,
    offset: ["start end", "end 0.8"],
  })

  const { scrollYProgress: projectsScrollProgress } = useScroll({
    target: projectsRef,
    offset: ["start end", "end 0.8"],
  })

  const { scrollYProgress: skillsScrollProgress } = useScroll({
    target: skillsRef,
    offset: ["start end", "end 0.8"],
  })

  // Spring configs - can potentially reduce damping for faster feel
  const springConfig = { stiffness: 80, damping: 12, restDelta: 0.001 }
  const smoothBlogProgress = useSpring(blogScrollProgress, springConfig)
  const smoothProjectsProgress = useSpring(projectsScrollProgress, springConfig)
  const smoothSkillsProgress = useSpring(skillsScrollProgress, springConfig)

  // Hero section animations
  const { scrollYProgress: heroScrollProgress } = useScroll({ target: heroRef, offset: ["start start", "end 0.6"] });
  const smoothHeroProgress = useSpring(heroScrollProgress, springConfig);
  const heroOpacity = useTransform(smoothHeroProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(smoothHeroProgress, [0, 0.6], [1, 0.85]);
  const heroY = useTransform(smoothHeroProgress, [0, 0.6], [0, -150]);

  // Apply custom hook for section animations
  const blogAnimation = useSectionAnimation(smoothBlogProgress)
  const projectsAnimation = useSectionAnimation(smoothProjectsProgress)
  const skillsAnimation = useSectionAnimation(smoothSkillsProgress)

  return (
    <main className="relative flex flex-col bg-black" ref={ref}>
      <ParticlesContainer />

      <motion.section 
        ref={heroRef}
        style={{ 
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY 
        }} 
        className="relative z-10 flex min-h-screen items-center justify-center pt-24"
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
        ref={blogRef}
        style={blogAnimation}
        className="relative z-10 flex min-h-screen items-center py-32"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="transform-gpu"
          >
            <h2 className="mb-12 text-center text-4xl font-bold">From the Blog</h2>
            <Link 
              href="https://jafspaper.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block mx-auto max-w-4xl transition-transform duration-300 ease-in-out hover:scale-[1.02] focus:scale-[1.02]"
            >
              <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/50 shadow-lg backdrop-blur-md">
                <div className="grid gap-6 md:grid-cols-2 md:gap-0">
                  <div className="relative aspect-video md:aspect-auto">
                    <Image 
                      src="/blog.png" 
                      alt="jaf's paper blog preview" 
                      fill 
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r"></div>
                  </div>
                  <div className="flex flex-col justify-center p-6 md:p-8">
                    <p className="mb-1 text-sm text-gray-400">Latest Post • April 8, 2024</p>
                    <h3 className="mb-3 text-2xl font-semibold text-white">my first post (and why)</h3>
                    <p className="mb-4 text-gray-300">
                      Feels kinda crazy that I&apos;m writing something, haven&apos;t been writing actively about remotely anything...
                    </p>
                    <div className="mt-2 inline-flex items-center font-medium text-white group-hover:text-primary transition-colors">
                      Read More 
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        ref={projectsRef}
        style={projectsAnimation}
        className="relative z-10 flex min-h-screen items-center py-32"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="transform-gpu"
          >
            <motion.h2 
              className="mb-16 text-center text-4xl font-bold"
            >
              Featured Projects
            </motion.h2>
            <motion.div
            >
              <ProjectsShowcase />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        ref={skillsRef}
        style={skillsAnimation}
        className="relative z-10 flex min-h-screen items-center py-32"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="transform-gpu"
          >
            <motion.h2 
              className="mb-16 text-center text-4xl font-bold"
            >
              Skills & Technologies
            </motion.h2>
            <motion.div
            >
              <SkillsCloud />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

    </main>
  )
}

