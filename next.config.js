/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com", // For Google auth profile images
      "avatars.githubusercontent.com", // For GitHub auth profile images
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = withPWA(nextConfig);
