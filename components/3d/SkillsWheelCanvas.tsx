/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect, Suspense } from "react"
// import dynamic from "next/dynamic" // Commented out as no longer used
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"

// Import skills array for fallback mode
const skills = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#FFFFFF" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "HTML/CSS", color: "#E34F26" },
  { name: "Tailwind", color: "#38B2AC" },
  { name: "Node.js", color: "#339933" },
  { name: "Java", color: "#007396" },
  { name: "Python", color: "#3776AB" },
  { name: "C#", color: "#239120" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "MySQL", color: "#4479A1" },
  
]

// Create a static fallback component
function SkillsWheelFallback() {
  return (
    <div className="h-[700px] w-full flex items-center justify-center bg-[#f9f4fb]/50 rounded-xl">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 border-4 border-[#d14d84] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[#604065] font-medium">Loading skills visualization...</p>
      </div>
    </div>
  )
}

// Use dynamic import with a custom loader that handles errors
/*
const DynamicSkillsWheel = dynamic(
  () => import('./SkillsWheel').then(mod => mod.SkillsWheel),
  {
    ssr: false
  }
)
*/

export function SkillsWheelCanvas() {
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState(false)
  const [lowPerformance, setLowPerformance] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    
    // Check if device likely has poor WebGL performance
    const checkPerformance = () => {
      try {
        // Check screen size (mobile devices may struggle)
        const isMobile = window.innerWidth < 768
        
        // Test WebGL support
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('webgl') as WebGLRenderingContext
        
        if (!context) {
          setLowPerformance(true)
          return
        }
        
        if (isMobile) {
          setLowPerformance(true)
        }
      } catch (_err) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setLowPerformance(true)
      }
    }
    
    checkPerformance()
  }, [])
  
  if (!mounted) {
    return <SkillsWheelFallback />
  }
  
  // Simplified low-performance version
  if (lowPerformance || error) {
    return (
      <div className="h-[700px] w-full relative bg-[#f9f4fb]/50 rounded-xl flex items-center justify-center">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-3xl p-6">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow hover:-translate-y-1 duration-300"
              style={{
                borderLeft: `4px solid ${skill.color}`
              }}
            >
              <div className="font-semibold text-[#604065]">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  return (
    <div className="h-[700px] w-full relative">
      <Canvas 
        camera={{ position: [0, 0, 14], fov: 50 }}
        onError={() => setError(true)}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        
        {!error && (
          <Suspense fallback={null}>
            <Environment preset="city" />
            {/* <DynamicSkillsWheel radius={5} /> */}
          </Suspense>
        )}
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
          rotateSpeed={0.5}
        />
      </Canvas>
      
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f9f4fb]/50 rounded-xl">
          <p className="text-[#604065] font-medium">Could not load skills visualization.</p>
        </div>
      ) : (
        <div className="absolute bottom-4 left-0 right-0 text-center text-[#604065]/70 text-sm">
          <span className="bg-[#f9f4fb]/70 px-3 py-1 rounded-full">
            Scroll to rotate the wheel
          </span>
        </div>
      )}
    </div>
  )
} 