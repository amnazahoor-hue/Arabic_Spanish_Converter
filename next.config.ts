import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "react-icons"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    const canonical = "https://traductorarabeespanol.es";
    const aliasHosts = [
      "arabic-spanish-converter.vercel.app",
      "www.traductorarabeespanol.es",
      "xn--traductorarabeespaol-l7b.es",
      "traductorarabeespañol.es",
      "www.traductorarabeespañol.es",
    ];

    return aliasHosts.map((host) => ({
      source: "/:path*",
      has: [{ type: "host", value: host }],
      destination: `${canonical}/:path*`,
      permanent: true,
    }));
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
