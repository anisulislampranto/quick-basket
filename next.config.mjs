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

const nextConfig = {};

export default pwaConfig(nextConfig);
