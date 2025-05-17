"use client"

import { Suspense, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { 
  Environment, 
  PerspectiveCamera, 
  useTexture, 
  OrbitControls,
  Float
} from "@react-three/drei"
import * as THREE from "three"

// Import the FoldingText component
import { FoldingText } from "./FoldingText"

function Floor() {
  const gridTexture = useTexture("/textures/grid.png")

  try {
    if (gridTexture) {
      gridTexture.wrapS = gridTexture.wrapT = THREE.RepeatWrapping
      gridTexture.repeat.set(50, 50)
      gridTexture.anisotropy = 16
    }
  } catch (error) {
    // This catch might not be strictly necessary anymore for texture loading itself,
    // but can be kept for other potential errors within this block.
    console.error("Error processing texture properties:", error)
  }
  
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

export function SceneClient() {
  try {
    return (
      <>
        <color attach="background" args={["#f0e5f3"]} />
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={60} />
        <Environment preset="sunset" />
        
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
          color="#604065"
        />
        
        <Suspense fallback={null}>
          <Float
            speed={1.5}
            rotationIntensity={0.15}
            floatIntensity={0.4}
          >
            <FoldingText 
              position={[-2, 2.5, 0]} 
              fontSize={6} 
              color="#604065"
              hoverColor="#d14d84"
            />
          </Float>
          <Floor />
          <FloatingParticles />
        </Suspense>
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
          maxAzimuthAngle={Math.PI / 6}
          minAzimuthAngle={-Math.PI / 6}
        />
      </>
    )
  } catch (error) {
    console.error("Error rendering THREE.js scene:", error)
    return null
  }
} 