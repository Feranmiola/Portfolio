import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // A stray lockfile in a parent folder otherwise makes Next guess the wrong root.
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/debiu7z1b/**",
      },
    ],
  },
};

export default nextConfig;
