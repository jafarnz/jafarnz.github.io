/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Mail, Github, Linkedin } from "lucide-react"

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Using Formspree - no API keys or env vars needed, just a form endpoint
      const response = await fetch("https://formspree.io/f/xwpoyrnb", { // Replace with your Formspree form ID
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      
      // Reset form
      setFormState({
        name: "",
        email: "",
        message: "",
      })
      
      setIsSubmitted(true)
    } catch (_err) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      setError("There was an error sending your message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-10"
      >
        {/* Contact Info */}
        <div className="space-y-8 bg-[#f9f4fb] p-8 rounded-2xl shadow-sm">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-[#604065] lowercase">get in touch</h3>
            <p className="text-[#604065]/80 lowercase">
              i&apos;m currently available for freelance work, collaborations, or just a friendly chat about technology.
              feel free to reach out!
            </p>
          </div>

          <div className="space-y-5">
            <motion.div 
              whileHover={{ y: -3 }}
              className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm"
            >
              <div className="bg-[#eacce6] p-3 rounded-full">
                <Mail className="h-5 w-5 text-[#d14d84]" />
              </div>
              <a href="mailto:jaf.nz@icloud.com" className="text-[#604065] hover:text-[#d14d84] transition-colors">
                jaf.nz@icloud.com
              </a>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -3 }}
              className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm"
            >
              <div className="bg-[#eacce6] p-3 rounded-full">
                <Github className="h-5 w-5 text-[#d14d84]" />
              </div>
              <a 
                href="https://github.com/jafarnz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#604065] hover:text-[#d14d84] transition-colors"
              >
                github.com/jafarnz
              </a>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -3 }}
              className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-sm"
            >
              <div className="bg-[#eacce6] p-3 rounded-full">
                <Linkedin className="h-5 w-5 text-[#d14d84]" />
              </div>
              <a 
                href="https://www.linkedin.com/in/jafar-niaz-27523231b/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#604065] hover:text-[#d14d84] transition-colors"
              >
                linkedin.com/in/jafarnz
              </a>
            </motion.div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[#f9f4fb] rounded-2xl p-8 shadow-sm border border-[#eacce6]">
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center p-8"
            >
              <div className="bg-[#eacce6] p-5 rounded-full mb-6">
                <Send className="h-8 w-8 text-[#d14d84]" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-[#604065]">Message Sent!</h3>
              <p className="text-[#604065]/80 mb-8">
                Thank you for your message. I&apos;ll get back to you as soon as possible.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-[#d14d84] font-medium bg-white px-5 py-2 rounded-full hover:bg-[#eacce6] transition-colors shadow-sm"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-[#604065]">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#eacce6] bg-white focus:outline-none focus:ring-2 focus:ring-[#d14d84]/20 focus:border-[#d14d84] transition"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-[#604065]">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-[#eacce6] bg-white focus:outline-none focus:ring-2 focus:ring-[#d14d84]/20 focus:border-[#d14d84] transition"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-[#604065]">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-[#eacce6] bg-white focus:outline-none focus:ring-2 focus:ring-[#d14d84]/20 focus:border-[#d14d84] transition resize-none"
                  placeholder="your message..."
                />
              </div>
              
              {error && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#d14d84] text-white font-medium py-3 px-6 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center shadow-sm lowercase"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    send message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
      <p className="mt-3 text-center text-sm text-[#604065]/80">
      </p>
      {/* Status Message */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-center text-sm text-[#d14d84]"
      >
        Thanks for your message! I&apos;ll get back to you soon.
      </motion.p>
    </div>
  )
} 