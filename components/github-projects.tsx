"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { GitFork, Star, ExternalLink, Github } from "lucide-react"
import Link from "next/link"

interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    Java: "#b07219",
    "C#": "#178600",
    HTML: "#e34c26",
    CSS: "#563d7c",
    PHP: "#4F5D95",
    Ruby: "#701516",
    Go: "#00ADD8",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Rust: "#DEA584",
  }

  return colors[language] || "#9ca3af"
}

export function GitHubProjects({ username = "jafarnz" }) {
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true)
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
        
        if (!response.ok) {
          throw new Error("Failed to fetch repositories")
        }
        
        const data = await response.json()
        
        // Filter out forked repos and the current portfolio
        const filteredRepos = data
          .filter((repo: Repository) => !repo.name.includes("jafarnz.github.io"))
          .slice(0, 6)
        
        setRepos(filteredRepos)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [username])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-lg h-64 bg-[#eacce6]/20"></div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">Error loading GitHub projects: {error}</p>
        <p>Check out my projects directly on <a href={`https://github.com/${username}`} className="text-[#d14d84] underline">GitHub</a></p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {repos.map((repo, index) => (
        <motion.div
          key={repo.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-[#f9f4fb] rounded-xl p-5 shadow-md hover:shadow-lg border border-[#eacce6] transition-all hover:translate-y-[-4px] group"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center space-x-2">
              <Github className="h-5 w-5 text-[#604065]" />
              <h3 className="font-semibold text-lg truncate max-w-[150px] text-[#604065]">{repo.name}</h3>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-[#d14d84]" />
                <span className="text-xs text-[#604065]/70">{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center space-x-1">
                <GitFork className="h-4 w-4 text-[#d14d84]" />
                <span className="text-xs text-[#604065]/70">{repo.forks_count}</span>
              </div>
            </div>
          </div>
          
          {repo.language && (
            <div className="flex items-center space-x-2 mb-2">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: getLanguageColor(repo.language) }}
              />
              <span className="text-xs text-[#604065]/80">{repo.language}</span>
            </div>
          )}
          
          <p className="text-[#604065]/90 text-sm mb-4 line-clamp-3">{repo.description || "No description provided."}</p>
          
          <div className="flex justify-between items-center mt-auto pt-2">
            <Link
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs rounded-full inline-flex items-center bg-[#eacce6] px-3 py-1.5 text-[#604065] hover:bg-[#d14d84] hover:text-white transition-colors"
            >
              <Github className="h-3 w-3 mr-1" />
              View Code
            </Link>
            
            {repo.homepage && (
              <Link
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs rounded-full inline-flex items-center bg-[#604065] px-3 py-1.5 text-white hover:bg-[#604065]/80 transition-colors"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Live Demo
              </Link>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
} 