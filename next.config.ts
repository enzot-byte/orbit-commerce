import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  transpilePackages: ["swiper"],
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
