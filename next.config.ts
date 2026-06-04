import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["vymkxxhsuxbmcaoiqkzt.supabase.co"],
  },
  // ADD THIS BLOCK TO INCREASE UPLOAD LIMIT
  experimental: {
    serverActions: {
      bodySizeLimit: "25mb",
    },
  },
};



export default nextConfig;