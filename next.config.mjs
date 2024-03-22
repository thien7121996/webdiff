/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  env: {
    ENV: process.env.ENV,
  },
};

export default nextConfig;
