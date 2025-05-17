/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '',
  reactStrictMode: false, // Important for Three.js
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Add transpilation for Three.js and ALL related packages to prevent SSR issues
  transpilePackages: [
    'three', 
    '@react-three/fiber', 
    '@react-three/drei',
    '@react-spring/three',
    'react-icons'
  ],
  // Prevent minification issues with Three.js
  webpack: (config) => {
    // Prevent bundling for client-side only packages
    config.externals = [
      ...(config.externals || []), 
      { canvas: 'canvas' }
    ];
    
    // Allow additional time for build
    config.watchOptions = {
      ...config.watchOptions,
      aggregateTimeout: 300,
      poll: 1000,
    };
    
    return config;
  },
};

export default nextConfig;
