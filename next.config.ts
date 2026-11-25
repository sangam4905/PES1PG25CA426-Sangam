import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Use this project folder when there are other lockfiles above it.
    root: __dirname,
  },
};

export default nextConfig;
