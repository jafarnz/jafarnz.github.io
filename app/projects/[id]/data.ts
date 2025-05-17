/* eslint-disable @typescript-eslint/no-unused-vars */
interface Tech {
  name: string
}

export const projects = {
  tpconnect: {
    title: "TPConnect.xyz",
    description:
      "A revolutionary platform connecting Temasek Polytechnic students for collaborative learning and resource sharing.",
    images: [
      "/TPConnectImage1.png",
      "/TPConnectImage2.png",
    ],
    features: [
      "Real-time chat and collaboration",
      "Module-specific study groups",
      "Resource sharing platform",
      "Peer-to-peer learning system",
    ],
    tech: [
      { name: "Next.js" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind" },
      { name: "PostgreSQL" },
      { name: "Supabase" },
    ],
    link: "https://tpconnect.xyz",
    accent: "#d14d84",
  },
  swyftviewer: {
    title: "SwyftViewer",
    description:
      "Professional-grade financial analytics platform for tracking cryptocurrencies and stocks in real-time.",
    images: [
      "/SwyftViewerImage1.png",
      "/SwyftViewerImage2.png",
    ],
    features: [
      "Real-time market data",
      "Advanced charting capabilities",
      "Portfolio tracking",
      "Market analysis tools",
    ],
    tech: [
      { name: "React" },
      { name: "Chart.js" },
      { name: "WebSocket" },
      { name: "Node.js" },
      { name: "MongoDB" },
    ],
    link: "https://swyftviewer.vercel.app",
    accent: "#eacce6",
  },
  swyft: {
    title: "Swyft",
    description:
      "A digital solutions agency empowering Singapore's small businesses through web development and digital transformation.",
    images: [
      "/SwyftImage1.png",
      "/SwyftImage2.png",
    ],
    features: [
      "Modern web development",
      "Digital transformation consulting",
      "Business process automation",
      "Custom software solutions",
    ],
    tech: [
      { name: "Next.js" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind" },
    ],
    link: "https://swyft3.vercel.app",
    accent: "#604065",
  },
  swyftbiz: {
    title: "swyftbiz",
    description:
      "An implemented design for a client's business website, creating a static view for them before they proceeded with implementation.",
    images: [
      "/SwyftBiz1.png",
      "/SwyftBiz2.png",
    ],
    features: [
      "Modern UI design with TailwindCSS",
      "Creation of dashboards, analytics etc.",
      "Simplifying SaaS innovation ",
      "Custom software solutions",
    ],
    tech: [
      { name: "Next.js" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind" },
    ],
    link: "https://swyftbiz.vercel.app",
    accent: "#d14d84",
  },
  jafspaper: {
    title: "jaf's paper",
    description:
      "Personal blog exploring thoughts, ideas, and reflections on technology, writing, and more.",
    images: [
      "/blog.png",
      // Add another relevant image path here if available, otherwise, the gallery will show just one.
    ],
    features: [
      "Personal thoughts and reflections",
      "Exploration of various topics",
      "Clean, minimalist design",
      "Built with Next.js and Tailwind",
    ],
    tech: [
      { name: "Next.js" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "Tailwind" },
    ],
    link: "https://jafspaper.vercel.app/",
    accent: "#f9f4fb", 
  },
  ningstudios: {
    title: "*NING Studios",
    description:
      "Official website for music artist NING, showcasing their nine personalities and groundbreaking music.",
    images: [
      "/ning-studios-preview.png", // Placeholder - Add this image to /public
      "/ning-studios-preview-2.png", // Added second image
      // Add another relevant image path here if available
    ],
    features: [
      "Artist Portfolio & Branding",
      "Music Discovery (Album, Singles)",
      "Tour Dates & Information",
      "Interactive Personality Showcase",
      "E-commerce Merch Store",
    ],
    tech: [
      { name: "Next.js" },
      { name: "React" },
      { name: "Tailwind" },
      // Add other relevant tech if known (e.g., TypeScript?)
    ],
    link: "https://ningstudios.vercel.app/",
    accent: "#d14d84", 
  },
  "lastfm-scrobbler": {
    title: "cunty scrobbler (last.fm)",
    description:
      "a fabulously reimagined python last.fm scrobbler with a yassified ui (hot pink, hello kitty vibes!), auto-saved credentials, direct authentication, and real-time 'now playing' updates. built for a client who needed something effective and absolutely cunty.",
    images: [
      "/LastFMScrobblerImage1.png", // Main image
      "/LastFMScrobblerImage2.png"  // Second image
    ],
    features: [
      "credentials auto-saved in config.json (no more login blues!)",
      "direct authentication (no tired web browser flow)",
      "total yassification of the ui: hot pink, custom fonts, main character energy",
      "real-time 'now playing' status updates",
      "enhanced album art fetching for search & 'now playing'",
      "search & scrobble as the default, prioritized tab",
      "improved button visibility (deeper pinks, borders)"
    ],
    tech: [
      { name: "Python" },
      { name: "pyqt6" }, 
      { name: "Last.fm API" }
    ],
    link: "https://github.com/jafarnz/lastfmscrobbler-py/releases/tag/slay", // Link to the release page
    accent: "#FF69B4", // Hot Pink
  }
} 