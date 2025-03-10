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
    accent: "#FF4B4B",
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
    accent: "#00FF88",
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
    accent: "#4B4BFF",
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
    accent: "#4B4BFF",
  },
} 