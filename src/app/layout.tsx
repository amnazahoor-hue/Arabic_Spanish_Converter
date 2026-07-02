import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { Header } from "@/components/layout/Header";
import { SITE_CONFIG } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { Cormorant_Garamond, Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";

const Footer = dynamic(() => import("@/components/layout/Footer").then((mod) => mod.Footer));

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

/** Latin subset files for Cormorant 600 (normal + italic) — preloaded for LCP hero accent text. */
const CRITICAL_DISPLAY_FONT_PRELOADS = [
  "/_next/static/media/01e4147cff8141ee-s.3huc2loe0ie8a.woff2",
  "/_next/static/media/8bd76523131fa0fc-s.1pvupmngxrt5z.woff2",
] as const;

export const metadata = {
  ...buildMetadata({
    title: `${SITE_CONFIG.name}: ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    path: "/",
  }),
  verification: {
    google: "gSgmHgbsquzjhiTFTUMQRXWJri0xtZQFLU7iI3MTYsk",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={SITE_CONFIG.locale}
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${display.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {CRITICAL_DISPLAY_FONT_PRELOADS.map((href) => (
          <link
            key={href}
            rel="preload"
            href={href}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            fetchPriority="high"
          />
        ))}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link
          rel="preload"
          as="image"
          href="/hero-mobile-bg.webp"
          fetchPriority="high"
          media="(max-width: 1279px)"
        />
        <link
          rel="preload"
          as="image"
          href="/hero-people-bg.webp"
          fetchPriority="high"
          media="(min-width: 1280px)"
        />
      </head>
      <body
        className="min-h-full flex flex-col font-sans antialiased"
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1 min-w-0 overflow-x-clip">{children}</main>
        <Footer />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
