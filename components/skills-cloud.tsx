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
} from "react-icons/si"

const skills = [
  { name: "React", color: "#61DAFB", icon: SiReact, delay: 0 },
  { name: "TypeScript", color: "#3178C6", icon: SiTypescript, delay: 0.1 },
  { name: "JavaScript", color: "#F7DF1E", icon: SiJavascript, delay: 0.2 },
  { name: "HTML/CSS", color: "#E34F26", icon: SiHtml5, delay: 0.3 },
  { name: "Java", color: "#007396", icon: SiOpenjdk, delay: 0.4 },
  { name: "Python", color: "#3776AB", icon: SiPython, delay: 0.2 },
  { name: "C#", color: "#239120", icon: SiSharp, delay: 0.3 },
  { name: "PostgreSQL", color: "#336791", icon: SiPostgresql, delay: 0.4 },
  { name: "MySQL", color: "#4479A1", icon: SiMysql, delay: 0.5 },
  { name: "Next.js", color: "#000000", icon: SiNextdotjs, delay: 0.1 },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
}

export function SkillsCloud() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5"
    >
      {skills.map((skill) => {
        const IconComponent = skill.icon
        return (
          <motion.div
            key={skill.name}
            variants={item}
            whileHover={{ scale: 1.05 }}
            className="group relative flex items-center justify-center"
          >
            <div
              className="relative flex w-full items-center gap-3 rounded-xl bg-black/50 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:bg-black/70"
              style={{
                boxShadow: `0 0 20px ${skill.color}20`,
                border: `1px solid ${skill.color}30`,
              }}
            >
              <IconComponent className="h-6 w-6" style={{ color: skill.color }} />
              <span className="font-mono text-lg" style={{ color: skill.color }}>
                {skill.name}
              </span>
              <div
                className="absolute inset-0 -z-10 rounded-xl opacity-0 blur transition-opacity duration-300 group-hover:opacity-20"
                style={{ backgroundColor: skill.color }}
              />
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

