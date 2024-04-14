/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'z9kyu3fdoy8xge2y.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
