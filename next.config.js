/** @type {import('next').NextConfig} */

const nextConfig = {

  // output: 'export',  // Remove for SSR

  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // basePath: '/next',   // Folder Run

};

module.exports = nextConfig;
