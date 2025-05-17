"use client"

import { useRef, useEffect, useState, useMemo } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import { ArrowDown, Github, ExternalLink } from "lucide-react"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"
import { VerticalPagination } from "@/components/vertical-pagination"
import { ProjectsTabs } from "@/components/projects-tabs"
import { SkillsCloud } from "@/components/skills-cloud"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { ISourceOptions } from "@tsparticles/engine"

// Particles component for interactive background
function ParticlesBackground() {
  const [init, setInit] = useState(false)

  // Initialize the particles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  // Configure the particles
  const particlesOptions: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "bubble",
          },
        },
        modes: {
          push: {
            quantity: 3,
          },
          bubble: {
            distance: 200,
            duration: 0.4,
            size: 40,
            opacity: 0.8,
          },
          repulse: {
            distance: 100,
          },
          attract: {
            distance: 200,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: [
            "#d14d84", 
            "#eacce6", 
            "#f9f4fb"
          ],
        },
        links: {
          color: "#eacce6",
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1,
        },
        collisions: {
          enable: true,
          mode: "bounce",
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1.2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 40,
        },
        opacity: {
          value: { min: 0.2, max: 0.5 },
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0.2,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 10, max: 30 },
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 5,
            sync: false,
          },
        },
      },
      detectRetina: true,
    }),
    [],
  )

  if (!init) return null

  return <Particles id="tsparticles" options={particlesOptions} className="absolute inset-0 z-0" />
}

export default function Home() {
  // Define section names for vertical pagination
  const sections = ["home", "about", "skills", "projects", "contact"]
  
  // Refs for scroll animations
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const contactRef = useRef(null)
  
  // Ensure page starts at top on load
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  // Section animations setup
  const { scrollYProgress: aboutScrollProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end 0.8"],
  })
  
  const { scrollYProgress: skillsScrollProgress } = useScroll({
    target: skillsRef,
    offset: ["start end", "end 0.8"],
  })
  
  const { scrollYProgress: projectsScrollProgress } = useScroll({
    target: projectsRef,
    offset: ["start end", "end 0.8"],
  })
  
  const { scrollYProgress: contactScrollProgress } = useScroll({
    target: contactRef,
    offset: ["start end", "end 0.8"],
  })
  
  // Spring configs for smoother animations
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const smoothAboutProgress = useSpring(aboutScrollProgress, springConfig)
  const smoothSkillsProgress = useSpring(skillsScrollProgress, springConfig)
  const smoothProjectsProgress = useSpring(projectsScrollProgress, springConfig)
  const smoothContactProgress = useSpring(contactScrollProgress, springConfig)
  
  // Section animations
  const aboutAnimation = {
    opacity: useTransform(smoothAboutProgress, [0, 0.2], [0, 1]),
    y: useTransform(smoothAboutProgress, [0, 0.2], [50, 0]),
  }
  
  const skillsAnimation = {
    opacity: useTransform(smoothSkillsProgress, [0, 0.2], [0, 1]),
    y: useTransform(smoothSkillsProgress, [0, 0.2], [50, 0]),
  }
  
  const projectsAnimation = {
    opacity: useTransform(smoothProjectsProgress, [0, 0.2], [0, 1]),
    y: useTransform(smoothProjectsProgress, [0, 0.2], [50, 0]),
  }
  
  const contactAnimation = {
    opacity: useTransform(smoothContactProgress, [0, 0.2], [0, 1]),
    y: useTransform(smoothContactProgress, [0, 0.2], [50, 0]),
  }

  // Text animation variants
  const textContainer = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };
  
  const textChild = {
    hidden: {
      opacity: 0,
      y: 20,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
  };

  return (
    <main className="relative bg-[#f0e5f3]">
      <Navigation />
      <VerticalPagination sections={sections} />
      
      {/* Hero Section with Text Animation */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" id="home">
        <div className="absolute inset-0 bg-[#f0e5f3]">
          <ParticlesBackground />
        </div>
        
        <div className="container mx-auto text-center z-10">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className="text-7xl md:text-9xl font-bold text-[#604065] mb-4 lowercase"
              variants={textContainer}
              initial="hidden"
              animate="visible"
            >
              {"hello".split("").map((letter, index) => (
                <motion.span
                  key={index}
                  variants={textChild}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-[#604065]/80 mt-4 lowercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              i&apos;m jafar niaz, a full stack developer and year 2 information tech student at temasek polytechnic, singapore
            </motion.p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.8 }}
            className="absolute bottom-10 left-0 right-0 text-center"
          >
            <div className="flex flex-col items-center">
              <div className="bg-[#eacce6] p-3 rounded-full shadow-md">
                <ArrowDown className="h-6 w-6 text-[#604065] animate-bounce" />
              </div>
              <p className="text-[#604065] mt-3 font-medium lowercase">scroll to explore</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About/Intro Section with Image and Text */}
      <motion.section
        ref={aboutRef}
        style={aboutAnimation}
        className="relative py-28 px-4 bg-gradient-soft"
        id="about"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                <Image
                  src="/DashboardMyPic.jpeg"
                  alt="Jafar Niaz"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#d14d84]/20 to-transparent"></div>
              </div>
              
              <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full bg-[#eacce6]/50 -z-10"></div>
              <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-[#d14d84]/20 -z-10"></div>
            </div>
            
            <div className="space-y-6 bg-[#f9f4fb] p-8 rounded-2xl shadow-sm border border-[#eacce6]">
              <div>
                <h3 className="font-medium text-[#d14d84] mb-2 lowercase">hello, i&apos;m</h3>
                <h1 className="text-5xl font-bold mb-4 text-[#604065] lowercase">jafar niaz</h1>
                <p className="text-xl text-[#604065]/80 lowercase">
                  full stack developer | temasek polytechnic
                </p>
              </div>
              
              <div className="space-y-4">
                <p className="text-[#604065]/90 lowercase">
                  i&apos;m passionate about crafting digital experiences through web development, while exploring 
                  the intersections of technology, creative writing, game design, and music composition.
                </p>
                <p className="text-[#604065]/90 lowercase">
                  with a strong foundation in modern web technologies, i enjoy building applications that 
                  are not only functional but also aesthetically pleasing and user-friendly.
                </p>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <a 
                  href="https://github.com/jafarnz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 bg-[#d14d84] text-white px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity shadow-sm lowercase"
                >
                  <Github className="h-4 w-4" />
                  <span>github</span>
                </a>
                <a 
                  href="https://jafspaper.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-2 bg-[#eacce6] text-[#604065] px-5 py-2.5 rounded-full hover:bg-[#d14d84] hover:text-white transition-colors shadow-sm lowercase"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>blog</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        ref={skillsRef}
        style={skillsAnimation}
        className="relative py-28 px-4"
        id="skills"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#604065] lowercase">skills</h2>
            <p className="text-[#604065]/80 mt-4 max-w-2xl mx-auto lowercase">
              technologies and tools i work with
            </p>
          </div>
          
          <div className="bg-[#f9f4fb] p-8 rounded-2xl shadow-sm">
            <SkillsCloud />
          </div>
        </div>
      </motion.section>

      {/* Projects Section (Tabbed) */}
      <motion.section
        ref={projectsRef}
        style={projectsAnimation}
        className="relative py-28 px-4"
        id="projects"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#604065] lowercase">projects</h2>
            <p className="text-[#604065]/80 mt-4 max-w-2xl mx-auto lowercase">
              a showcase of my work, ranging from full-stack applications to smaller side projects.
            </p>
          </div>
          
          <ProjectsTabs />
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        ref={contactRef}
        style={contactAnimation}
        className="relative py-28 px-4"
        id="contact"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#604065] lowercase">contact me</h2>
            <p className="text-[#604065]/80 mt-4 max-w-2xl mx-auto lowercase">
              have a project in mind or want to collaborate? let&apos;s get in touch!
            </p>
          </div>
          
          <ContactSection />
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-12 px-4 text-center border-t border-[#eacce6]">
        <div className="container mx-auto">
          <p className="text-[#604065]/80 lowercase">
            © {new Date().getFullYear()} jafar niaz. all rights reserved.
          </p>
          <p className="text-[#604065]/60 mt-2 text-sm lowercase">
            built with next.js and tailwind css
          </p>
        </div>
      </footer>
    </main>
  )
}

