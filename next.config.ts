import type { NextConfig } from "next";
import { LEGACY_ROUTE_REDIRECTS } from "./src/lib/routes";

const polyfillStub = "./src/lib/next-polyfill-stub.js";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  experimental: {
    inlineCss: true,
    cssChunking: true,
    optimizePackageImports: ["lucide-react", "framer-motion", "react-icons"],
  },
  turbopack: {
    resolveAlias: {
      "../build/polyfills/polyfill-module": polyfillStub,
      "next/dist/build/polyfills/polyfill-module": polyfillStub,
    },
  },
  webpack(config, { isServer }) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "../build/polyfills/polyfill-module": polyfillStub,
      "next/dist/build/polyfills/polyfill-module": polyfillStub,
    };

    if (!isServer && config.optimization?.splitChunks) {
      const splitChunks = config.optimization.splitChunks;
      splitChunks.maxAsyncRequests = 12;
      splitChunks.maxInitialRequests = 8;
      splitChunks.minSize = 20_000;
    }

    return config;
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    const canonical = "http://traductorarabeespanol.es";
    const aliasHosts = [
      "www.traductorarabeespanol.es",
      "traductorarabeespañol.es",
      "www.traductorarabeespañol.es",
      "xn--traductorarabeespaol-l7b.es",
    ];

    const hostRedirects = aliasHosts.map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: `${canonical}/:path*`,
      permanent: true,
    }));

    const slugRedirects = LEGACY_ROUTE_REDIRECTS.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    }));

    return [...hostRedirects, ...slugRedirects];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      {
        source: "/:path*.webp",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*.svg",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*.png",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
