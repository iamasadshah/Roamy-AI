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
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hucdeaomnflmaztiggbo.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // Keep any existing patterns you have
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = withPWA(nextConfig);
