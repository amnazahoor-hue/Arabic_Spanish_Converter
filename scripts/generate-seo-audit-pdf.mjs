import { jsPDF } from "jspdf";
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "docs", "SEO-Audit-Technical-Report.pdf");

const doc = new jsPDF({ unit: "mm", format: "a4" });
const margin = 14;
const pageWidth = 210 - margin * 2;
let y = 18;

function addTitle(text) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(text, margin, y);
  y += 8;
}

function addSubtitle(text) {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(text, margin, y);
  y += 6;
}

function addParagraph(text) {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  const lines = doc.splitTextToSize(text, pageWidth);
  for (const line of lines) {
    if (y > 285) {
      doc.addPage();
      y = 18;
    }
    doc.text(line, margin, y);
    y += 4.6;
  }
  y += 2;
}

function addBullet(text) {
  addParagraph(`- ${text}`);
}

addTitle("SEO Technical Audit Report");
addParagraph("Project: Traductor Arabe Espanol (Arabic_Spanish_Converter)");
addParagraph("Date: June 22, 2026 | Scope: Full codebase read-only audit");
addParagraph("Production URL: https://traductorarabeespanol.es");
y += 2;

addSubtitle("1. Executive summary");
addParagraph(
  "The site has a solid technical SEO foundation: canonical URLs, JSON-LD on key pages, WebApplication schema on tool pages, FAQ schema on home and Marroqui landing, lazy-loaded images, OG image at 1200x630, and recent fixes for breadcrumb schema, clean hreflang URLs, footer heading structure, icon weight, and translator output helper text. Several metadata, content, E-E-A-T, and AEO items still need developer or content work before the checklist is fully green.",
);
y += 2;

addSubtitle("2. Recently fixed (do not regress)");
const fixed = [
  "Homepage BreadcrumbList JSON-LD in homePageSchemas() (src/lib/schema.ts)",
  "Organization sameAs from NEXT_PUBLIC_SOCIAL_* env vars (src/lib/constants.ts, schema.ts)",
  "Clean alternates.languages URLs without ?lang= query params (src/lib/seo.ts)",
  "Footer column labels changed from h2 to div (src/components/layout/Footer.tsx)",
  "OG/Twitter image wired to /opengraph-image 1200x630 (src/lib/og-image.ts, seo.ts)",
  "Image alt + title on logo, backgrounds, author, Marroqui features",
  "Lazy loading via LazyBackgroundLayer and loading=lazy on below-fold images",
  "Icons: icon.svg (~0.4 KB), favicon.ico (~0.6 KB), apple-icon.png (~5 KB)",
  "Translator output helper: Traduccion instantanea de IA (TranslatorPanel.tsx)",
];
for (const item of fixed) addBullet(item);
y += 2;

addSubtitle("3. Developer action items (priority order)");
const actions = [
  "[P1] Rewrite page titles to 50-60 chars with primary keyword at start (about, contact, legal, marroqui). Files: src/app/**/page.tsx, layout.tsx",
  "[P1] Expand meta descriptions to 140-160 chars on marroqui, contact, privacy, terms, disclaimer. File: src/app/**/page.tsx",
  "[P1] Set NEXT_PUBLIC_SOCIAL_* URLs in Vercel so Organization sameAs is populated in production",
  "[P2] Add internal links in first 3-4 paragraphs on homepage body to /traductor-marroqui-espanol (Hero, Features, ArabicDialects)",
  "[P2] Add Related tools block at bottom of / and /traductor-marroqui-espanol linking pillar pages",
  "[P2] Add visible author/byline on indexable content pages or link to /author from About",
  "[P2] Publish contact email (mailto) on /contact in addition to form",
  "[P3] Add homepage What is a traductor arabe espanol? definition block (40-60 word lead)",
  "[P3] Add Key Takeaways box near top of home and marroqui pages",
  "[P3] Add HowTo steps for using the translator (numbered list in HowItWorks or new section)",
  "[P3] Table of contents component for long legal/about pages (>1500 words)",
  "[P3] Social share buttons on pillar pages (home, marroqui)",
  "[P3] Run Google Rich Results Test on / and /traductor-marroqui-espanol; fix any schema warnings",
  "[P3] Validate CLS in Lighthouse after translation loads; output panel uses min-height + skeleton",
  "[P4] Add bold/emphasis on answer phrases in FAQ and legal copy (content/*.ts)",
  "[P4] Source FAQ questions from real PAA (People Also Ask) research",
  "[P4] Reduce apple-icon.png further or document PNG requirement for Apple touch icons",
];
for (const item of actions) addBullet(item);
y += 2;

addSubtitle("4. Checklist status snapshot");
addParagraph("PASSING: 47 items | FAILING: 38 items | N/A or external: 5 items");
y += 1;

addSubtitle("PASSING highlights");
const passing = [
  "A3 Unique titles, A6 keyword variations in descriptions (most pages)",
  "B1-B3, B5-B6 Heading structure on main pages",
  "C2, C4, C5 URL hygiene (hyphenated, no ?lang= on indexable pages)",
  "D1, D3, D4, D6 Content intent and semantic keywords",
  "E2-E8 Images mostly WebP, alt/title, lazy load, OG 1200x630, descriptive filenames",
  "F1-F2, F4, F7-F9 Internal linking basics",
  "G1-G3, G5-G7 Schema: FAQ, breadcrumb sitewide, WebApplication, Article on legal",
  "H1-H5 Canonical, no duplicate meta, thin pages noindexed",
  "I2-I3, I5 About + legal pages + lastUpdated Mayo 2026",
  "J2-J5 Tool above fold, CTAs, shallow nav, lists",
  "K2-K3, K9 Marroqui darija section, FAQ phrasing, translator helper text",
];
for (const item of passing) addBullet(item);
y += 2;

if (y > 240) {
  doc.addPage();
  y = 18;
}

addSubtitle("FAILING highlights");
const failing = [
  "A1-A2 Title keyword position and length on most non-home pages; home title 62 chars",
  "A4 Meta description length on 6+ pages outside 140-160 range",
  "C1 Keyword-less URLs: /about, /contact, /author",
  "D2, D5, D7-D10 Keyword density unverified, SERP word count, PAA FAQs, answer-first, no bold in content",
  "E1 Not all assets are WebP (favicon.ico, apple-icon.png, icon.svg)",
  "F3, F6, F10 Early internal links, full topic cluster, related tools footer blocks",
  "G4 sameAs empty if social env vars unset; G8 no documented Rich Results validation",
  "I1, I4, I6 No author on content pages, limited external citations, no public email",
  "J1, J6-J8 No TOC on long pages, CLS unverified, no video, no share buttons",
  "K1, K4-K8, K10-K15 AEO gaps: short hero lead, no HowTo, no speakable, no tables, off-site signals",
];
for (const item of failing) addBullet(item);
y += 2;

addSubtitle("5. Files reviewed");
addParagraph(
  "src/app/**/page.tsx, layout.tsx, sitemap.ts, robots.ts, opengraph-image.tsx | src/lib/seo.ts, schema.ts, constants.ts, siteUrl.ts, og-image.ts | src/components/sections/*, layout/Footer.tsx, brand/Logo.tsx, media/* | src/content/*.ts | public/** image assets",
);
y += 2;

addSubtitle("6. Sign-off");
addParagraph(
  "This report is read-only analysis. No application code was modified during PDF generation. Re-run audit after implementing P1-P2 items and redeploying to production.",
);

writeFileSync(outPath, Buffer.from(doc.output("arraybuffer")));
console.log(`Wrote ${outPath}`);
