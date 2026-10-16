import type { NextConfig } from "next";

/**
 * GitHub Pages base path:
 * - User site (`https://YOUR_GITHUB_USERNAME.github.io`): leave empty
 * - Project site (`https://YOUR_GITHUB_USERNAME.github.io/REPO`): set to `/REPO`
 *
 * Set via env `NEXT_PUBLIC_BASE_PATH` (see README). Do not invent a username.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(basePath
    ? {
        basePath,
        assetPrefix: `${basePath}/`,
      }
    : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
