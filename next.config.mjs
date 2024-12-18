/** @type {import('next').NextConfig} */

// Import next-pwa using ES module syntax
import withPWA from "next-pwa";

// Configure PWA
const pwaConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  sw: "sw.js",
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "quick-basket-backend-yam4.onrender.com",
      },
    ],
  },
};

export default pwaConfig(nextConfig);
