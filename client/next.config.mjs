/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  // Very important ↓
  experimental: {
    optimizePackageImports: [], // disable auto Geist font classes
  },
};

export default nextConfig;
