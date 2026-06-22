import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";
import { buildMetadata, organizationSchema, webSiteSchema } from "@/lib/seo";
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
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  preload: true,
});

export const metadata = buildMetadata({
  title: `${SITE_CONFIG.name}: ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
  path: "/",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${display.variable} h-full`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-sans antialiased"
        suppressHydrationWarning
      >
        <JsonLd data={[organizationSchema(), webSiteSchema()]} />
        <Header />
        <main className="flex-1 min-w-0 overflow-x-clip">{children}</main>
        <Footer />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
