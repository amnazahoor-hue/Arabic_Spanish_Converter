import { LANGUAGES, SITE_CONFIG, type LanguageCode } from "@/lib/constants";
import { getPublicSiteUrl } from "@/lib/publicSiteUrl";

export type PdfExportPayload = {
  sourceLang: LanguageCode;
  targetLang: LanguageCode;
  input: string;
  output: string;
};

const BRAND = {
  primary: "#1a6b6b",
  secondary: "#c9943a",
  heading: "#1a1a2e",
  body: "#2c2c4a",
  muted: "#7a7a9a",
  bg: "#fbf7f0",
  surface: "#ffffff",
  border: "#d8d8e8",
} as const;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildExportElement(payload: PdfExportPayload): HTMLDivElement {
  const { sourceLang, targetLang, input, output } = payload;
  const from = LANGUAGES[sourceLang];
  const to = LANGUAGES[targetLang];
  const date = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const publicSiteUrl = getPublicSiteUrl();
  const generatedMeta = publicSiteUrl ? `Generated ${date} · ${publicSiteUrl}` : `Generated ${date}`;

  const root = document.createElement("div");
  root.setAttribute("aria-hidden", "true");
  root.style.cssText = [
    "position:fixed",
    "left:-10000px",
    "top:0",
    "width:794px",
    "padding:0",
    "margin:0",
    "font-family:Inter,system-ui,sans-serif",
    "background:" + BRAND.bg,
  ].join(";");

  root.innerHTML = `
    <div style="background:${BRAND.bg};padding:32px;box-sizing:border-box;">
      <div style="background:${BRAND.primary};border-radius:14px;padding:20px 24px;display:flex;align-items:center;gap:16px;margin-bottom:24px;">
        <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 32c6-12 12-18 20-24 3 5 5 10 5 15 0 3-2 6-5 8-7 3-14 1-20-1Z" fill="#ffffff" opacity="0.15"/>
          <path d="M10 30c5-8 10-13 18-18M14 24c3-5 8-8 14-12" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round"/>
          <path d="M26 10h7v7M29.5 7v14" stroke="${BRAND.secondary}" stroke-width="1.8" stroke-linecap="round"/>
          <text x="20" y="22" text-anchor="middle" font-size="11" font-family="Georgia,serif" fill="#ffffff">ع</text>
        </svg>
        <div>
          <div style="color:#ffffff;font-size:22px;font-weight:700;letter-spacing:-0.02em;">${SITE_CONFIG.name}</div>
          <div style="color:rgba(255,255,255,0.85);font-size:13px;margin-top:4px;">Arabic ↔ Spanish Translation</div>
        </div>
      </div>
      <div style="font-size:12px;color:${BRAND.muted};margin-bottom:20px;">${generatedMeta}</div>
      <div style="background:${BRAND.surface};border:1px solid ${BRAND.border};border-radius:14px;padding:20px;margin-bottom:16px;">
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:${BRAND.secondary};margin-bottom:8px;">Original · ${from.label}</div>
        <div style="font-size:15px;line-height:1.6;color:${BRAND.body};white-space:pre-wrap;word-break:break-word;direction:${from.dir};text-align:${from.dir === "rtl" ? "right" : "left"};">${escapeHtml(input)}</div>
      </div>
      <div style="background:${BRAND.surface};border:2px solid ${BRAND.primary};border-radius:14px;padding:20px;margin-bottom:24px;">
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:${BRAND.primary};margin-bottom:8px;">Translation · ${to.label}</div>
        <div style="font-size:15px;line-height:1.6;color:${BRAND.heading};white-space:pre-wrap;word-break:break-word;direction:${to.dir};text-align:${to.dir === "rtl" ? "right" : "left"};">${escapeHtml(output)}</div>
      </div>
      <div style="border-top:1px solid ${BRAND.border};padding-top:16px;font-size:11px;color:${BRAND.muted};text-align:center;">
        Machine translation for reference only — not a substitute for certified human translation.
      </div>
    </div>
  `;

  return root;
}

export async function downloadTranslationPdf(payload: PdfExportPayload): Promise<void> {
  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const element = buildExportElement(payload);
  document.body.appendChild(element);

  try {
    const canvas = await html2canvas(element.firstElementChild as HTMLElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: BRAND.bg,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const stamp = new Date().toISOString().slice(0, 10);
    pdf.save(`al-andalus-translation-${stamp}.pdf`);
  } finally {
    document.body.removeChild(element);
  }
}
