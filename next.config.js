/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'images.unsplash.com',
      'res.cloudinary.com', // add this line
    ],
  },
};

module.exports = nextConfig;
