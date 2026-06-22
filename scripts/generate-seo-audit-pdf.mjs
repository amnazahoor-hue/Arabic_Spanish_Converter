/**
 * Generates docs/SEO-Technical-Audit-Report.pdf (table-based technical report)
 * Run: node scripts/generate-seo-audit-pdf.mjs
 */
import { jsPDF } from "jspdf";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "docs");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "SEO-Technical-Audit-Report.pdf");

const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
const margin = 12;
const pw = 210 - margin * 2;
let y = 16;
let pageNum = 1;

const COLORS = {
  headerBg: [26, 107, 107],
  headerText: [255, 255, 255],
  pass: [22, 120, 78],
  fail: [185, 50, 45],
  partial: [180, 130, 20],
  na: [110, 110, 110],
  resolved: [22, 120, 78],
  open: [185, 50, 45],
  rowAlt: [245, 248, 248],
  border: [200, 210, 210],
};

const footer = () => {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(120);
  doc.text(
    `Traductor Arabe Espanol | SEO Technical Audit v3 | ${pageNum}`,
    margin,
    292
  );
  doc.setTextColor(0);
};

const newPage = () => {
  doc.addPage();
  pageNum++;
  y = 16;
  footer();
};

const ensure = (n = 10) => {
  if (y + n > 278) newPage();
};

const title = (t) => {
  ensure(14);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(26, 107, 107);
  doc.text(t, margin, y);
  doc.setTextColor(0);
  y += 8;
};

const sub = (t) => {
  ensure(10);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(t, margin, y);
  y += 6;
};

const para = (t) => {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  for (const line of doc.splitTextToSize(t, pw)) {
    ensure(5);
    doc.text(line, margin, y);
    y += 4.2;
  }
  y += 2;
};

/** Draw a data table with wrapped cell text */
function drawTable({ headers, colWidths, rows, title: tableTitle }) {
  if (tableTitle) {
    sub(tableTitle);
  }

  const baseRowH = 6;
  const fontSize = 7.5;
  const headerH = 7;
  const tableW = colWidths.reduce((a, b) => a + b, 0);

  const wrapCell = (text, width) => {
    doc.setFontSize(fontSize);
    return doc.splitTextToSize(String(text ?? ""), width - 3);
  };

  const measureRow = (cells) => {
    let maxLines = 1;
    cells.forEach((cell, i) => {
      const lines = wrapCell(cell, colWidths[i]);
      maxLines = Math.max(maxLines, lines.length);
    });
    return Math.max(baseRowH, maxLines * 3.6 + 2);
  };

  const drawHeader = () => {
    ensure(headerH + 4);
    let x = margin;
    doc.setFillColor(...COLORS.headerBg);
    doc.rect(margin, y, tableW, headerH, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(fontSize);
    doc.setTextColor(...COLORS.headerText);
    headers.forEach((h, i) => {
      doc.text(h, x + 1.5, y + 4.8);
      x += colWidths[i];
    });
    doc.setTextColor(0);
    y += headerH;
  };

  const statusColor = (status) => {
    const s = String(status).toUpperCase();
    if (s === "PASS" || s === "RESOLVED" || s === "DONE") return COLORS.pass;
    if (s === "FAIL" || s === "OPEN") return COLORS.fail;
    if (s === "PARTIAL") return COLORS.partial;
    if (s === "N/A") return COLORS.na;
    return [0, 0, 0];
  };

  drawHeader();

  rows.forEach((row, rowIdx) => {
    const rowH = measureRow(row);
    if (y + rowH > 278) {
      newPage();
      drawHeader();
    }

    if (rowIdx % 2 === 1) {
      doc.setFillColor(...COLORS.rowAlt);
      doc.rect(margin, y, tableW, rowH, "F");
    }

    doc.setDrawColor(...COLORS.border);
    doc.rect(margin, y, tableW, rowH);

    let x = margin;
    row.forEach((cell, i) => {
      doc.rect(x, y, colWidths[i], rowH);
      const lines = wrapCell(cell, colWidths[i]);
      const isStatusCol =
        headers[i]?.toLowerCase().includes("status") ||
        headers[i]?.toLowerCase() === "st";
      doc.setFont("helvetica", isStatusCol && lines.length === 1 ? "bold" : "normal");
      if (isStatusCol && lines.length === 1) {
        doc.setTextColor(...statusColor(cell));
      } else {
        doc.setTextColor(40);
      }
      lines.forEach((line, li) => {
        doc.text(line, x + 1.5, y + 4 + li * 3.6);
      });
      doc.setTextColor(0);
      x += colWidths[i];
    });
    y += rowH;
  });

  y += 5;
}

// ── COVER ──────────────────────────────────────────────────────────
title("SEO Technical Audit Report");
doc.setFont("helvetica", "normal");
doc.setFontSize(10);
para("Project: Traductor Arabe Espanol (Arabic_Spanish_Converter)");
para("Report version: 3.0 — table-based tracking format");
para("Audit date: 22 June 2026 | URL: https://traductorarabeespanol.es");
para("Stack: Next.js 16 | TypeScript | Tailwind | Vercel");
footer();

newPage();
sub("1. Executive summary");
drawTable({
  title: "Table 1 — Audit score progression",
  headers: ["Version", "Date", "PASS", "FAIL", "N/A", "Compliance"],
  colWidths: [22, 28, 16, 16, 14, 30],
  rows: [
    ["v1.0", "Initial audit", "47", "38", "5", "~52%"],
    ["v2.0", "Post first fixes", "52", "33", "5", "~56%"],
    ["v3.0", "Current (this report)", "54", "31", "5", "~58%"],
  ],
});

para(
  "Net change v1 to v3: +7 PASS, -7 FAIL. Primary gains: heading hierarchy, TOC on all legal pages, schema cleanup, image/OG fixes, footer semantics."
);

newPage();
sub("2. Fix tracking table (resolved items)");
drawTable({
  title: "Table 2 — Developer fixes log",
  headers: ["ID", "Priority", "Item", "Status", "File / Area", "Notes"],
  colWidths: [14, 12, 38, 18, 38, 52],
  rows: [
    ["DEV-10", "P3", "Footer promo h2", "RESOLVED", "Footer.tsx", "h2 changed to p, same classes"],
    ["DEV-11", "P3", "TOC on long pages", "RESOLVED", "LegalPage.tsx + about/privacy", "LegalTableOfContents component"],
    ["DEV-14", "P4", "TOC terms/disclaimer", "RESOLVED", "terms + disclaimer page.tsx", "showToc prop enabled"],
    ["—", "—", "WebSite schema removed", "RESOLVED", "schema.ts", "Standalone WebSite JSON-LD removed"],
    ["—", "—", "Common phrases bg bleed", "RESOLVED", "CommonPhrases.tsx", "Full-width section background"],
    ["—", "—", "Footer column h2 fix", "RESOLVED", "Footer.tsx", "Column titles use div not h2"],
    ["—", "—", "LinkedIn social removed", "RESOLVED", "constants.ts", "FOOTER_SOCIAL + icons updated"],
    ["—", "—", "Clean hreflang URLs", "RESOLVED", "seo.ts", "No ?lang= query on alternates"],
    ["—", "—", "Home BreadcrumbList", "RESOLVED", "schema.ts", "JSON-LD on homepage"],
    ["—", "—", "OG 1200x630 image", "RESOLVED", "opengraph-image.tsx", "Twitter image route added"],
  ],
});

newPage();
sub("3. Legal pages — TOC coverage");
drawTable({
  title: "Table 3 — Table of contents (jump links) status",
  headers: ["Route", "Indexable", "showToc", "Sections", "Anchor IDs"],
  colWidths: [42, 22, 18, 18, 82],
  rows: [
    ["/about", "Yes", "Yes", "6", "Auto slug from heading (legal-section-id.ts)"],
    ["/privacy-policy", "No", "Yes", "10", "Auto slug + scroll-mt for sticky header"],
    ["/terms-and-conditions", "No", "Yes", "11", "DEV-14 fix applied"],
    ["/disclaimer", "No", "Yes", "8", "DEV-14 fix applied"],
    ["/contact", "Yes", "No", "7", "Has contact form topChildren; TOC optional"],
  ],
});

newPage();
sub("4. Full SEO checklist (A–K)");
drawTable({
  title: "Table 4 — Checklist status matrix",
  headers: ["ID", "Cat", "Check item", "St", "File / evidence"],
  colWidths: [12, 10, 58, 14, 78],
  rows: [
    ["A1", "Title", "Keyword at title start", "FAIL", "layout.tsx, app/**/page.tsx"],
    ["A2", "Title", "Title length 50-60 chars", "FAIL", "marroqui 34ch; about 14ch; contact 11ch"],
    ["A3", "Title", "Unique titles per page", "PASS", "buildMetadata per route"],
    ["A4", "Meta", "Description 140-160 chars", "FAIL", "marroqui, contact, terms short"],
    ["A5", "Meta", "Unique descriptions", "PASS", "All routes distinct"],
    ["A6", "Meta", "Keyword in descriptions", "PASS", "SITE_CONFIG + page copy"],
    ["B1", "Hdg", "Single H1 per page", "PASS", "LegalPage, Hero, MarroquiLanding"],
    ["B2", "Hdg", "H2 subtopics on home", "PASS", "Features, FAQ, HowItWorks, etc."],
    ["B3", "Hdg", "Logical H1>H2>H3", "PASS", "No skipped levels in main content"],
    ["B4", "Hdg", "Footer no false h2", "PASS", "Columns div; promo uses p"],
    ["C1", "URL", "Keyword-rich slugs", "PARTIAL", "/traductor-marroqui-espanol ok"],
    ["C4", "URL", "Clean hreflang", "PASS", "seo.ts — no ?lang= params"],
    ["C5", "URL", "Sitemap indexable only", "PASS", "sitemap.ts — 4 URLs"],
    ["D3", "Link", "Home links to marroqui", "FAIL", "No body link in home sections"],
    ["D7", "Link", "Author byline", "FAIL", "Author page noindex, no byline"],
    ["E2", "Img", "OG 1200x630", "PASS", "opengraph-image.tsx"],
    ["E5", "Img", "Common phrases full bleed", "PASS", "CommonPhrases section structure"],
    ["F3", "E-E-A-T", "Public support email", "FAIL", "Contact form only"],
    ["F8", "AEO", "40-60 word home answer", "FAIL", "Hero lead ~27 words"],
    ["G2", "Schema", "Organization sameAs", "PARTIAL", "Needs Vercel NEXT_PUBLIC_SOCIAL_*"],
    ["G8", "Schema", "Rich Results validated", "FAIL", "No CI/manual log"],
    ["H1", "Tech", "robots.txt + sitemap", "PASS", "app/robots.ts, sitemap.ts"],
    ["H5", "Tech", "Production build", "PASS", "npm run build passes"],
    ["J5", "UX", "TOC on legal long pages", "PASS", "4/4 legal long pages have showToc"],
    ["J7", "UX", "Social share buttons", "FAIL", "Not implemented"],
    ["K3", "Social", "Live social profile URLs", "FAIL", "Placeholder # until env set"],
  ],
});

newPage();
sub("5. Open developer issues");
drawTable({
  title: "Table 5 — Open issues (cause + solution)",
  headers: ["ID", "Pri", "Issue", "St", "Cause", "Solution"],
  colWidths: [14, 10, 32, 12, 48, 66],
  rows: [
    [
      "DEV-01",
      "P1",
      "Title length/keyword",
      "OPEN",
      "Short titles in page.tsx",
      "50-60 chars; keyword first per route",
    ],
    [
      "DEV-02",
      "P1",
      "Meta descriptions short",
      "OPEN",
      "Several pages <140 chars",
      "Expand to 140-160 in buildMetadata",
    ],
    [
      "DEV-03",
      "P1",
      "sameAs empty prod",
      "OPEN",
      "Social env vars unset",
      "Set NEXT_PUBLIC_SOCIAL_* on Vercel",
    ],
    [
      "DEV-04",
      "P2",
      "Weak home internal links",
      "OPEN",
      "No marroqui link in body",
      "Link in ArabicDialects + Features",
    ],
    [
      "DEV-05",
      "P2",
      "No author byline",
      "OPEN",
      "Author noindex",
      "Byline on about linking to /author",
    ],
    [
      "DEV-06",
      "P2",
      "No public email",
      "OPEN",
      "Form only on contact",
      "Add mailto on /contact + footer",
    ],
    [
      "DEV-07",
      "P3",
      "Short AEO home answer",
      "OPEN",
      "Hero lead too short",
      "40-60 word definition + Key Takeaways",
    ],
    [
      "DEV-08",
      "P3",
      "No HowTo steps",
      "OPEN",
      "HowItWorks = examples",
      "Numbered 3-5 steps + optional schema",
    ],
    [
      "DEV-09",
      "P3",
      "Schema not validated",
      "OPEN",
      "No Rich Results log",
      "Test / and /traductor-marroqui-espanol",
    ],
    [
      "DEV-12",
      "P4",
      "FAQ not from PAA",
      "OPEN",
      "Editorial FAQ only",
      "Research PAA; update faq.ts",
    ],
    [
      "DEV-13",
      "P4",
      "No share buttons",
      "OPEN",
      "Missing on pillar pages",
      "ShareButtons on home + marroqui",
    ],
  ],
});

newPage();
sub("6. Architecture reference");
drawTable({
  title: "Table 6 — Routes and indexing",
  headers: ["Route", "Robots", "Sitemap", "Schema types"],
  colWidths: [48, 22, 22, 90],
  rows: [
    ["/", "index", "Yes", "Breadcrumb, Org, WebPage, WebApp, FAQ"],
    ["/traductor-marroqui-espanol", "index", "Yes", "Breadcrumb, WebPage, WebApp, FAQ"],
    ["/about", "index", "Yes", "Breadcrumb, AboutPage, Article"],
    ["/contact", "index", "Yes", "Breadcrumb, ContactPage, Article"],
    ["/privacy-policy", "noindex", "No", "Breadcrumb, WebPage, Article + TOC"],
    ["/terms-and-conditions", "noindex", "No", "Breadcrumb, WebPage, Article + TOC"],
    ["/disclaimer", "noindex", "No", "Breadcrumb, WebPage, Article + TOC"],
    ["/author", "noindex", "No", "Breadcrumb, ProfilePage"],
  ],
});

drawTable({
  title: "Table 7 — Key source files",
  headers: ["Area", "Primary file", "Responsibility"],
  colWidths: [28, 52, 92],
  rows: [
    ["Metadata", "src/lib/seo.ts", "buildMetadata, canonical, OG, hreflang"],
    ["Schema", "src/lib/schema.ts", "JSON-LD generators per page type"],
    ["TOC", "src/components/legal/LegalTableOfContents.tsx", "Jump-link nav for legal pages"],
    ["TOC IDs", "src/lib/legal-section-id.ts", "Slug anchors from section headings"],
    ["Sitemap", "src/app/sitemap.ts", "Indexable URL list"],
    ["Social", "src/lib/constants.ts", "FOOTER_SOCIAL, organizationSameAs()"],
    ["Images", "src/lib/og-image.ts", "OG_IMAGE constants 1200x630"],
  ],
});

newPage();
sub("7. Recommended sprint plan");
drawTable({
  title: "Table 8 — Sprint backlog by priority",
  headers: ["Sprint", "Priority", "DEV IDs", "Goal", "Est. effort"],
  colWidths: [18, 14, 28, 78, 24],
  rows: [
    ["Sprint 1", "P1", "DEV-01,02,03", "Titles, descriptions, Vercel social env", "2-4 hrs"],
    ["Sprint 2", "P2", "DEV-04,05,06", "Internal links, byline, public email", "3-5 hrs"],
    ["Sprint 3", "P3", "DEV-07,08,09", "AEO block, HowTo, schema validation", "4-6 hrs"],
    ["Sprint 4", "P4", "DEV-12,13", "PAA FAQs, share buttons", "3-4 hrs"],
  ],
});

sub("Sign-off");
para("Generated by: node scripts/generate-seo-audit-pdf.mjs");
para("Output path: docs/SEO-Technical-Audit-Report.pdf");
para("Classification: Internal technical document — use tables for sprint tracking.");
para("Next audit: re-run script after Sprint 1 completion to update Table 1 scores.");

writeFileSync(outPath, Buffer.from(doc.output("arraybuffer")));
console.log("PDF generated:", outPath);
