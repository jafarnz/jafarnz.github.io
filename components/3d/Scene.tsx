/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck 
// TODO: Remove the above comments and fix the no-unused-vars errors if this file is actively used.
"use client"

import { Suspense, useRef, useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Canvas, useFrame } from "@react-three/fiber"
import { FoldingText } from "./FoldingText"
import { 
  Environment, 
  PerspectiveCamera, 
  useTexture, 
  OrbitControls,
  Float
} from "@react-three/drei"
import * as THREE from "three"
import { ArrowDown } from "lucide-react"

function Floor() {
  const gridTexture = useTexture("/textures/grid.png")
  
  gridTexture.wrapS = gridTexture.wrapT = THREE.RepeatWrapping
  gridTexture.repeat.set(50, 50)
  gridTexture.anisotropy = 16
  
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial 
        color="#f0e5f3"
        metalness={0.1}
        roughness={0.8}
        map={gridTexture}
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

function FloatingParticles() {
  const groupRef = useRef<THREE.Group>(null)
  const particleCount = 50
  const particlePositions = Array.from({ length: particleCount }, () => ({
    position: [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10 + 5,
      (Math.random() - 0.5) * 20
    ],
    speed: Math.random() * 0.02 + 0.005,
    size: Math.random() * 0.3 + 0.1
  }))

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    
    groupRef.current.children.forEach((particle, i) => {
      const speed = particlePositions[i].speed
      const time = clock.getElapsedTime()
      
      particle.position.y += Math.sin(time * speed) * 0.005
      particle.rotation.y += 0.01
    })
  })

  return (
    <group ref={groupRef}>
      {particlePositions.map((particle, i) => (
        <mesh key={i} position={particle.position as unknown as THREE.Vector3}>
          <icosahedronGeometry args={[particle.size, 1]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#d14d84" : "#eacce6"}
            transparent 
            opacity={0.7} 
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}

// Create a static fallback component
function SceneFallback() {
  return (
    <div className="h-screen w-full absolute top-0 left-0 bg-[#f0e5f3] flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 border-4 border-[#d14d84] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[#604065] font-medium">Loading 3D experience...</p>
      </div>
    </div>
  )
}

// Use dynamic import with a custom loader that handles errors
const DynamicScene = dynamic(
  () => 
    import('./Scene.client').then(mod => mod.SceneClient)
    .catch(err => {
      console.error('Failed to load 3D scene:', err)
      return () => null
    }),
  {
    ssr: false,
    loading: () => null
  }
)

export function Scene() {
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
        
        // Create a test renderer
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl') as WebGLRenderingContext
        
        if (!gl) {
          // WebGL not supported
          setLowPerformance(true)
          return
        }
        
        // Check max textures
        const maxTextures = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS)
        
        // Set low performance if mobile or limited WebGL capabilities
        if (isMobile || maxTextures < 8) {
          setLowPerformance(true)
        }
      } catch (err) {
        // If any error, default to low performance mode
        setLowPerformance(true)
      }
    }
    
    checkPerformance()
  }, [])
  
  if (!mounted) {
    return <SceneFallback />
  }
  
  if (lowPerformance) {
    return (
      <div className="h-screen w-full absolute top-0 left-0 touch-none bg-[#f0e5f3] flex flex-col items-center justify-center">
        <h1 className="text-7xl md:text-9xl font-bold text-[#604065]">hello</h1>
        <div className="absolute bottom-10 flex flex-col items-center">
          <div className="bg-[#eacce6] p-3 rounded-full shadow-md mt-8">
            <ArrowDown className="h-6 w-6 text-[#604065] animate-bounce" />
          </div>
          <p className="text-[#604065] mt-3 font-medium">Scroll to explore</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="h-screen w-full absolute top-0 left-0 touch-none">
      <Canvas shadows onError={() => setError(true)}>
        {error ? null : <DynamicScene />}
      </Canvas>
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#f0e5f3]">
          <div className="text-center">
            <h1 className="text-7xl md:text-9xl font-bold text-[#604065]">hello</h1>
            <p className="text-[#604065] font-medium mt-8">
              Could not load 3D experience.
            </p>
          </div>
        </div>
      )}
    </div>
  )
} 