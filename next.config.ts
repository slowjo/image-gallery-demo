import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mars.nasa.gov',
        // port: '',
        // pathname: '/my-bucket/**',
        // search: '',
      },
      {
        protocol: 'http',
        hostname: 'mars.nasa.gov',
        // port: '',
        // pathname: '/my-bucket/**',
        // search: '',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        // port: '',
        // pathname: '/my-bucket/**',
        // search: '',
      },
    ],
  },
};

export default nextConfig;
