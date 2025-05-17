"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Post {
  id: string
  title: string
  date: string
  excerpt: string
  coverImage: string
  slug: string
}

// Example fallback data in case fetching fails
const fallbackPost: Post = {
  id: "1",
  title: "my first post (and why)",
  date: "April 8, 2024",
  excerpt: "Feels kinda crazy that I'm writing something, haven't been writing actively about remotely anything...",
  coverImage: "/blog.png",
  slug: "my-first-post",
}

export function BlogExcerpt() {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLatestPost() {
      try {
        // You can replace this with your actual API endpoint
        // const response = await fetch('https://jafspaper.vercel.app/api/latest-post')
        // if (response.ok) {
        //   const data = await response.json()
        //   setPost(data)
        // } else {
        //   setPost(fallbackPost)
        // }
        
        // Using fallback data for now
        setPost(fallbackPost)
      } catch (error) {
        console.error("Error fetching blog post:", error)
        setPost(fallbackPost)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestPost()
  }, [])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto animate-pulse">
        <div className="rounded-lg overflow-hidden border border-gray-200 shadow-md">
          <div className="h-[300px] bg-gray-200"></div>
          <div className="p-6 bg-white">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!post) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <Link
        href="https://jafspaper.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <div className="rounded-lg overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 bg-white">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-[300px] overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 pointer-events-none" />
            </div>
            
            <div className="p-8 flex flex-col justify-center">
              <p className="text-sm text-gray-500 mb-2">Latest Post • {post.date}</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="mt-auto flex items-center text-primary font-medium group-hover:text-primary/80">
                Read More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
} 