"use client"

// import { motion } from "framer-motion" // Commented out as unused
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
  SiGit,
  SiDocker,
  SiMongodb,
  SiGo,
  SiAmazon,
  SiGithub,
  SiFirebase,
  SiFlutter,
  SiDart,
} from "react-icons/si"
import { ArrowLeftRight } from "lucide-react"
import { useRef, useState, useEffect } from "react"

const skills = [
  { name: "Go", color: "#00ADD8", icon: SiGo },
  { name: "React", color: "#61DAFB", icon: SiReact },
  { name: "Next.js", color: "#000000", icon: SiNextdotjs, bgColor: true },
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
  { name: "Git", color: "#F05032", icon: SiGit },
  { name: "GitHub", color: "#181717", icon: SiGithub },
  { name: "Docker", color: "#2496ED", icon: SiDocker },
  { name: "MongoDB", color: "#47A248", icon: SiMongodb },
  { name: "AWS", color: "#FF9900", icon: SiAmazon },
  { name: "Firebase", color: "#FFCA28", icon: SiFirebase },
  { name: "Flutter", color: "#02569B", icon: SiFlutter },
  { name: "Dart", color: "#0175C2", icon: SiDart },
]

export function SkillsCloud() {
  // Create an array with duplicated skills for seamless looping
  const duplicatedSkills = [...skills, ...skills];
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Added for managing wheel timeout
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Handle mouse/touch scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    setIsPaused(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    setIsPaused(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    // Reset pause after a short delay to allow for smooth transition back to animation
    setTimeout(() => setIsPaused(false), 300);
  };

  // Handle wheel scrolling
  const handleWheel = (e: React.WheelEvent) => {
    if (containerRef.current) {
      e.preventDefault(); // Prevent page scroll
      containerRef.current.scrollLeft += e.deltaY;
      setIsPaused(true);
      // Reset pause after a short delay
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
      wheelTimeoutRef.current = setTimeout(() => setIsPaused(false), 500);
    }
  };

  // Reset the animation when scrolling to boundary for infinite effect
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { scrollLeft, scrollWidth /*, clientWidth */ } = containerRef.current; // Commented out clientWidth
      const halfwayPoint = scrollWidth / 2; // The point where the first set of items ends and the second (duplicated) set begins
      
      // If scrolled to the end of the first set of items (or near it)
      if (scrollLeft >= halfwayPoint - 1) { // Using -1 for a small buffer
        // Jump to the beginning of the first set of items
        containerRef.current.scrollLeft = 0;
      } 
      // If scrolled to the absolute beginning of the content
      else if (scrollLeft <= 0) {
        // Jump to the beginning of the second set of items
        // This makes it appear as if scrolling left from the start wraps around to the end
        containerRef.current.scrollLeft = halfwayPoint;
      }
    };

    const currentRef = containerRef.current;
    // Add the event listener only if currentRef is not null
    if (currentRef) {
      currentRef.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      // Remove the event listener only if currentRef is not null
      if (currentRef) {
        currentRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="relative w-full py-4 overflow-hidden">
      {/* Scroll indicator */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
          <ArrowLeftRight className="h-5 w-5 text-[#d14d84] animate-pulse" />
          <p className="text-[#604065] text-sm">scroll or swipe to explore more skills</p>
        </div>
      </div>

      {/* Infinite scrolling container with manual scroll capability */}
      <div 
        ref={containerRef}
        className="overflow-x-auto mx-2 sm:mx-4 relative scrollbar-hide scroll-smooth"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUpOrLeave}
        onWheel={handleWheel}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div
          className={`flex gap-6 py-4 ${!isPaused ? 'animate-marquee' : ''}`}
          style={{ width: "max-content" }}
        >
          {duplicatedSkills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={`${skill.name}-${index}`}
                className="flex flex-col items-center justify-center flex-shrink-0 bg-white rounded-xl p-6 shadow-md min-w-[140px] h-[170px] transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div 
                  className={`relative flex items-center justify-center mb-4 p-3 rounded-full ${
                    skill.bgColor ? 'bg-black w-16 h-16 flex items-center justify-center' : ''
                  }`}
                  style={{ color: skill.color }}
                >
                  <IconComponent className="h-12 w-12" />
                </div>
                <span 
                  className="text-sm font-medium lowercase"
                  style={{ color: skill.name === "Next.js" ? "#000000" : skill.color }}
                >
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 60s linear infinite;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

