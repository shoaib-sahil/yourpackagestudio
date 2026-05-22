import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "demo2.themelexus.com",
        pathname: "/bocpak/wp-content/**",
      },
    ],
  },
};

export default nextConfig;
