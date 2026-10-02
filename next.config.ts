import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Product cut-outs sit on an exact card colour; serve images as-is so
  // lossy re-encoding doesn't shift that colour and reveal the image edge.
  images: { unoptimized: true },
};

export default nextConfig;
