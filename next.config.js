/** @type {import('next').NextConfig} */
const nextConfig = {
  
  experimental: {
    forceSwcTransforms: true,
  },
  
  reactStrictMode: true,
  
  compiler: {
    styledComponents: process.env.NODE_ENV === 'production'
  },
};

module.exports = nextConfig;
