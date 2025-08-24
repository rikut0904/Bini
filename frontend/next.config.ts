import type { NextConfig } from "next";

// Proxy /api/* -> BACKEND_ORIGIN/*
const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
  async rewrites() {
    const backendOrigin = process.env.BACKEND_ORIGIN || "http://backend:8080";
    return [
      {
        source: "/api/backend/:path*",
        destination: `${backendOrigin}/:path*`,
      },
    ];
  },
};

export default nextConfig;
