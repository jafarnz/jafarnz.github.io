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
} 