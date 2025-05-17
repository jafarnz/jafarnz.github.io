"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProjectsShowcase } from "./projects-showcase"
import { GitHubProjects } from "./github-projects"

export function ProjectsTabs() {
  const [activeTab, setActiveTab] = useState<"main" | "side">("main")

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex rounded-full bg-[#f9f4fb] p-1.5 shadow-sm">
          <div className="relative flex">
            <button
              onClick={() => setActiveTab("main")}
              className={`relative px-8 py-3 text-sm font-medium rounded-full z-10 transition-colors ${
                activeTab === "main"
                  ? "text-white"
                  : "text-[#604065] hover:text-[#604065]/80"
              }`}
            >
              Main Projects
            </button>
            <button
              onClick={() => setActiveTab("side")}
              className={`relative px-8 py-3 text-sm font-medium rounded-full z-10 transition-colors ${
                activeTab === "side"
                  ? "text-white"
                  : "text-[#604065] hover:text-[#604065]/80"
              }`}
            >
              Side Projects
            </button>
            
            {/* Moving background */}
            <motion.div
              className="absolute inset-0 z-0 rounded-full bg-[#d14d84]"
              initial={false}
              animate={{
                x: activeTab === "main" ? 0 : "100%",
                width: "50%",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.5,
            type: "spring", 
            stiffness: 100, 
            damping: 15 
          }}
          className="w-full"
        >
          {activeTab === "main" ? (
            <div className="container mx-auto px-4">
              <ProjectsShowcase />
            </div>
          ) : (
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto mb-10">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center text-[#604065]/80 bg-[#f9f4fb] p-6 rounded-xl shadow-sm"
                >
                  Explore my latest side projects directly from GitHub. These are smaller experiments, 
                  tools, and applications I&apos;ve built to learn new technologies or solve specific problems.
                </motion.p>
              </div>
              <GitHubProjects />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
} 