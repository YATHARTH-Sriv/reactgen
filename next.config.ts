import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {hostname:"www.tempolabs.ai"},{hostname: "lh3.googleusercontent.com"}
    ]
  }
};

export default nextConfig;
