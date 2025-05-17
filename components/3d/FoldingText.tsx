"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, useCursor } from "@react-three/drei"
import * as THREE from "three"

interface FoldingTextProps {
  text?: string
  position?: [number, number, number]
  color?: string
  hoverColor?: string
  fontSize?: number
}

export function FoldingText({
  text = "hello",
  position = [0, 0, 0],
  color = "#604065",
  hoverColor = "#d14d84",
  fontSize = 5,
}: FoldingTextProps) {
  const groupRef = useRef<THREE.Group>(null)
  const topHalfRef = useRef<THREE.Group>(null)
  const bottomHalfRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [unfolded, setUnfolded] = useState(false)
  const [animationStarted, setAnimationStarted] = useState(false)
  
  useCursor(hovered)

  // Initial setup - keep folded
  useEffect(() => {
    if (topHalfRef.current && bottomHalfRef.current) {
      topHalfRef.current.rotation.x = -Math.PI / 2
      bottomHalfRef.current.rotation.x = Math.PI / 2
      
      // Start animation after 1 second
      setTimeout(() => setAnimationStarted(true), 1000)
    }
  }, [])

  // Animation
  useFrame((state) => {
    if (!groupRef.current) return
    
    // Simple floating animation
    groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    
    // Handle unfolding animation
    if (animationStarted && !unfolded && topHalfRef.current && bottomHalfRef.current) {
      // Smoother animation with easing
      const progress = Math.min((state.clock.elapsedTime - 1) * 0.5, 1)
      const easedProgress = 1 - Math.pow(1 - progress, 3) // Cubic ease out
      
      if (progress >= 1) {
        setUnfolded(true)
      }
      
      topHalfRef.current.rotation.x = -Math.PI / 2 * (1 - easedProgress)
      bottomHalfRef.current.rotation.x = Math.PI / 2 * (1 - easedProgress)
    }
    
    // Simple scale animation on hover
    if (groupRef.current && unfolded) {
      groupRef.current.scale.x = THREE.MathUtils.lerp(
        groupRef.current.scale.x,
        hovered ? 1.1 : 1,
        0.1
      )
      groupRef.current.scale.y = THREE.MathUtils.lerp(
        groupRef.current.scale.y,
        hovered ? 1.1 : 1,
        0.1
      )
      groupRef.current.scale.z = THREE.MathUtils.lerp(
        groupRef.current.scale.z,
        hovered ? 1.1 : 1,
        0.1
      )
    }
  })

  return (
    <group 
      ref={groupRef} 
      position={[position[0] - 1, position[1], position[2]]} // Offset to left center
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Top half of the text */}
      <group ref={topHalfRef} position={[0, fontSize / 4, 0]}>
        <Text
          fontSize={fontSize}
          color={hovered ? hoverColor : color}
          anchorX="center"
          anchorY="bottom"
          position={[0, 0, 0]}
          letterSpacing={-0.05}
          maxWidth={fontSize * 5}
          clipRect={[-fontSize * 3, 0, fontSize * 3, fontSize / 2]}
        >
          {text}
        </Text>
      </group>
      
      {/* Bottom half of the text */}
      <group ref={bottomHalfRef} position={[0, -fontSize / 4, 0]}>
        <Text
          fontSize={fontSize}
          color={hovered ? hoverColor : color}
          anchorX="center"
          anchorY="top"
          position={[0, 0, 0]}
          letterSpacing={-0.05}
          maxWidth={fontSize * 5}
          clipRect={[-fontSize * 3, -fontSize / 2, fontSize * 3, 0]}
        >
          {text}
        </Text>
      </group>
    </group>
  )
} 