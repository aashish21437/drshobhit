import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/homepage.html",
        },
      ],
    };
  },
};

export default nextConfig;
