/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    ROOT_API_URL: process.env.ROOT_API_URL,
    TRIGGER_ROOT_URL: process.env.TRIGGER_ROOT_URL,
    WORKFLOW_ROOT_URL: process.env.WORKFLOW_ROOT_URL,
  },
};

export default nextConfig;
