/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiNodedotjs,
  SiChartdotjs,
  SiSupabase,
} from "react-icons/si"
import { Radio } from "lucide-react"

interface TechBadgeProps {
  name: string
}

// Custom Next.js icon component with white color
function NextJsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z" />
    </svg>
  )
}

const techIcons: Record<string, any> = {
  "Next.js": NextJsIcon,
  React: SiReact,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "HTML/CSS": SiHtml5,
  Tailwind: SiTailwindcss,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  "Node.js": SiNodedotjs,
  "Chart.js": SiChartdotjs,
  WebSocket: Radio,
  Supabase: SiSupabase,
}

const techColors: Record<string, string> = {
  "Next.js": "#FFFFFF",
  React: "#61DAFB",
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  "HTML/CSS": "#E34F26",
  Tailwind: "#38B2AC",
  PostgreSQL: "#336791",
  MongoDB: "#47A248",
  "Node.js": "#339933",
  "Chart.js": "#FF6384",
  WebSocket: "#4B4BFF",
  Supabase: "#3ECF8E",
}

export function TechBadge({ name }: TechBadgeProps) {
  const Icon = techIcons[name]
  const color = techColors[name] || "#4B5563"

  return (
    <div
      className="group relative flex items-center gap-2 rounded-xl bg-black/50 px-4 py-2 font-mono text-sm backdrop-blur-sm transition-all duration-300 hover:scale-105"
      style={{
        boxShadow: `0 0 20px ${color}20`,
        border: `1px solid ${color}30`,
        color: color,
      }}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {name}
      <div
        className="absolute inset-0 -z-10 rounded-xl opacity-0 blur transition-opacity duration-300 group-hover:opacity-20"
        style={{ backgroundColor: color }}
      />
    </div>
  )
}

