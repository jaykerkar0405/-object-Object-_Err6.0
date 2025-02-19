import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "yogasense.vercel.app",
        "silver-couscous-ww46gx7wwj92v55v-3000.app.github.dev",
      ],
    },
  },
};

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  exclude: [({ asset }) => asset.name.startsWith("/api/")],
});

export default withSerwist(nextConfig);
