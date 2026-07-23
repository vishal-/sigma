import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Google profile pictures
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      // Facebook profile pictures
      { protocol: "https", hostname: "*.fbcdn.net" },
      { protocol: "https", hostname: "*.facebook.com" },
      // Microsoft / Entra profile pictures
      { protocol: "https", hostname: "*.microsoft.com" },
      { protocol: "https", hostname: "*.microsoftonline.com" },
    ],
  },
};

export default nextConfig;

