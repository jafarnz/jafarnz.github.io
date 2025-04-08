"use client"

import { motion } from "framer-motion"
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiOpenjdk,
  SiPython,
  SiSharp,
  SiPostgresql,
  SiMysql,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
} from "react-icons/si"

const skills = [
  { name: "React", color: "#61DAFB", icon: SiReact },
  { name: "Next.js", color: "#FFFFFF", icon: SiNextdotjs },
  { name: "TypeScript", color: "#3178C6", icon: SiTypescript },
  { name: "JavaScript", color: "#F7DF1E", icon: SiJavascript },
  { name: "HTML/CSS", color: "#E34F26", icon: SiHtml5 },
  { name: "Tailwind", color: "#38B2AC", icon: SiTailwindcss },
  { name: "Node.js", color: "#339933", icon: SiNodedotjs },
  { name: "Java", color: "#007396", icon: SiOpenjdk },
  { name: "Python", color: "#3776AB", icon: SiPython },
  { name: "C#", color: "#239120", icon: SiSharp },
  { name: "PostgreSQL", color: "#336791", icon: SiPostgresql },
  { name: "MySQL", color: "#4479A1", icon: SiMysql },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function SkillsCloud() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-wrap justify-center items-center gap-10 md:gap-16 max-w-4xl mx-auto"
    >
      {skills.map((skill) => {
        const IconComponent = skill.icon
        return (
          <motion.div
            key={skill.name}
            variants={itemVariants}
            whileHover={{ scale: 1.1, transition: { type: 'spring', stiffness: 300 } }}
            className="flex flex-col items-center text-center group w-20"
          >
            <div
              className="relative flex items-center justify-center p-3 mb-2 rounded-full transition-all duration-300 group-hover:bg-white/10"
              style={{ color: skill.color }}
            >
              <IconComponent className="h-10 w-10 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <span 
              className="text-xs font-mono opacity-80 group-hover:opacity-100 transition-opacity"
              style={{ color: skill.color }}
            >
              {skill.name}
            </span>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

