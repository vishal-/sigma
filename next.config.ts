import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Google profile pictures
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      // Facebook profile pictures
      { protocol: "https", hostname: "*.fbcdn.net" },
      { protocol: "https", hostname: "*.facebook.com" },
      { protocol: "https", hostname: "*.fbsbx.com" },
      // Microsoft / Entra profile pictures
      { protocol: "https", hostname: "*.microsoft.com" },
      { protocol: "https", hostname: "*.microsoftonline.com" },
      // Cloudflare R2 CDN (uploaded images)
      { protocol: "https", hostname: "i.puja.best" },
    ],
  },
};

export default nextConfig;

