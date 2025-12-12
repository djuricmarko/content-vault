import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,  images: {
    remotePatterns: [new URL('https://lh3.googleusercontent.com/**')],
  },
};

export default nextConfig;
