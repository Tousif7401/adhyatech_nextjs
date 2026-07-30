/** @type {import('next').NextConfig} */

const nextConfig = {

  // output: 'export',  // Remove for SSR

  trailingSlash: false,
  images: {
    unoptimized: true,
  },

  // basePath: '/next',   // Folder Run

};

module.exports = nextConfig;
