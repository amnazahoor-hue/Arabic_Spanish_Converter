import { LANGUAGES, SITE_CONFIG, type LanguageCode } from "@/lib/constants";
import {
  countCharacters,
  countWords,
  createDocumentReference,
  formatGeneratedAt,
} from "@/lib/pdf/documentStats";
import { getPublicSiteUrl } from "@/lib/publicSiteUrl";

export type PdfExportPayload = {
  sourceLang: LanguageCode;
  targetLang: LanguageCode;
  input: string;
  output: string;
};

const BRAND = {
  primary: "#1a6b6b",
  primaryDark: "#145757",
  secondary: "#c9943a",
  heading: "#1a1a2e",
  body: "#2c2c4a",
  muted: "#7a7a9a",
  bg: "#fbf7f0",
  surface: "#ffffff",
  border: "#d8d8e8",
  footerBg: "#f4ecdd",
} as const;

const PDF_FOOTER_HEIGHT_MM = 22;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function metaRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:6px 12px 6px 0;font-size:11px;font-weight:600;color:${BRAND.muted};white-space:nowrap;vertical-align:top;width:38%;">${escapeHtml(label)}</td>
      <td style="padding:6px 0;font-size:11px;color:${BRAND.body};vertical-align:top;">${escapeHtml(value)}</td>
    </tr>
  `;
}

function buildExportElement(payload: PdfExportPayload): {
  root: HTMLDivElement;
  meta: {
    documentId: string;
    generatedAt: string;
    direction: string;
    sourceStats: string;
    outputStats: string;
    siteLine: string;
  };
} {
  const { sourceLang, targetLang, input, output } = payload;
  const from = LANGUAGES[sourceLang];
  const to = LANGUAGES[targetLang];
  const documentId = createDocumentReference();
  const generatedAt = formatGeneratedAt();
  const publicSiteUrl = getPublicSiteUrl();
  const direction = `${from.label} (${from.nativeLabel}) → ${to.label} (${to.nativeLabel})`;

  const sourceChars = countCharacters(input);
  const sourceWords = countWords(input);
  const outputChars = countCharacters(output);
  const outputWords = countWords(output);

  const sourceStats = `${sourceChars.toLocaleString()} characters · ${sourceWords.toLocaleString()} words`;
  const outputStats = `${outputChars.toLocaleString()} characters · ${outputWords.toLocaleString()} words`;
  const siteLine = publicSiteUrl ? `${SITE_CONFIG.name} · ${publicSiteUrl}` : SITE_CONFIG.name;

  const root = document.createElement("div");
  root.setAttribute("aria-hidden", "true");
  root.style.cssText = [
    "position:fixed",
    "left:-10000px",
    "top:0",
    "width:794px",
    "padding:0",
    "margin:0",
    "font-family:Inter,Segoe UI,system-ui,sans-serif",
    "background:" + BRAND.bg,
  ].join(";");

  root.innerHTML = `
    <div style="background:${BRAND.bg};padding:40px 48px 32px;box-sizing:border-box;min-height:1050px;">
      <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
        <tr>
          <td style="vertical-align:middle;width:56px;">
            <div style="width:52px;height:52px;border-radius:12px;background:${BRAND.primary};display:flex;align-items:center;justify-content:center;">
              <span style="color:#fff;font-size:22px;font-family:Georgia,serif;line-height:1;">ع</span>
            </div>
          </td>
          <td style="vertical-align:middle;padding-left:16px;">
            <div style="font-size:24px;font-weight:700;color:${BRAND.heading};letter-spacing:-0.02em;line-height:1.2;">${SITE_CONFIG.name}</div>
            <div style="font-size:13px;color:${BRAND.muted};margin-top:4px;">Official translation record</div>
          </td>
          <td style="vertical-align:top;text-align:right;">
            <div style="display:inline-block;background:${BRAND.surface};border:1px solid ${BRAND.border};border-radius:10px;padding:10px 14px;text-align:left;">
              <div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:${BRAND.secondary};">Document ID</div>
              <div style="font-size:13px;font-weight:600;color:${BRAND.heading};margin-top:4px;font-family:ui-monospace,monospace;">${documentId}</div>
            </div>
          </td>
        </tr>
      </table>

      <div style="background:${BRAND.surface};border:1px solid ${BRAND.border};border-radius:12px;padding:16px 20px;margin-bottom:28px;">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:${BRAND.primary};margin-bottom:12px;">Document summary</div>
        <table style="width:100%;border-collapse:collapse;">
          ${metaRow("Generated", generatedAt)}
          ${metaRow("Language direction", direction)}
          ${metaRow("Source text", sourceStats)}
          ${metaRow("Translated text", outputStats)}
          ${metaRow("Service", siteLine)}
        </table>
      </div>

      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:${BRAND.secondary};margin-bottom:10px;">Original text · ${from.label}</div>
      <div style="background:${BRAND.surface};border:1px solid ${BRAND.border};border-left:4px solid ${BRAND.secondary};border-radius:12px;padding:22px 24px;margin-bottom:24px;">
        <div style="font-size:15px;line-height:1.65;color:${BRAND.body};white-space:pre-wrap;word-break:break-word;direction:${from.dir};text-align:${from.dir === "rtl" ? "right" : "left"};">${escapeHtml(input) || "—"}</div>
      </div>

      <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:${BRAND.primary};margin-bottom:10px;">Translation · ${to.label}</div>
      <div style="background:${BRAND.surface};border:1px solid ${BRAND.primary};border-left:4px solid ${BRAND.primary};border-radius:12px;padding:22px 24px;margin-bottom:32px;box-shadow:0 4px 20px rgba(26,107,107,0.08);">
        <div style="font-size:16px;line-height:1.65;color:${BRAND.heading};font-weight:500;white-space:pre-wrap;word-break:break-word;direction:${to.dir};text-align:${to.dir === "rtl" ? "right" : "left"};">${escapeHtml(output)}</div>
      </div>

      <div style="background:${BRAND.footerBg};border:1px solid ${BRAND.border};border-radius:12px;padding:18px 22px;margin-top:auto;">
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:${BRAND.primaryDark};margin-bottom:10px;">Calculation &amp; document details</div>
        <table style="width:100%;border-collapse:collapse;">
          ${metaRow("Document reference", documentId)}
          ${metaRow("Export timestamp", generatedAt)}
          ${metaRow("Character count (source → output)", `${sourceChars.toLocaleString()} → ${outputChars.toLocaleString()}`)}
          ${metaRow("Word count (source → output)", `${sourceWords.toLocaleString()} → ${outputWords.toLocaleString()}`)}
          ${metaRow("Length difference", `${(outputChars - sourceChars >= 0 ? "+" : "")}${(outputChars - sourceChars).toLocaleString()} characters`)}
          ${metaRow("Platform", siteLine)}
        </table>
        <div style="margin-top:14px;padding-top:12px;border-top:1px solid ${BRAND.border};font-size:10px;line-height:1.5;color:${BRAND.muted};text-align:center;">
          Machine translation for reference only. Not certified for legal, immigration, or official use. Verify important text with a qualified human translator.
        </div>
      </div>
    </div>
  `;

  return {
    root,
    meta: {
      documentId,
      generatedAt,
      direction,
      sourceStats,
      outputStats,
      siteLine,
    },
  };
}

function addPdfFooters(
  pdf: {
    getNumberOfPages: () => number;
    setPage: (page: number) => void;
    internal: { pageSize: { getWidth: () => number; getHeight: () => number } };
    setDrawColor: (r: number, g: number, b: number) => void;
    setFillColor: (r: number, g: number, b: number) => void;
    setLineWidth: (width: number) => void;
    line: (x1: number, y1: number, x2: number, y2: number) => void;
    rect: (x: number, y: number, w: number, h: number, style?: string) => void;
    setFont: (font: string, style: string) => void;
    setFontSize: (size: number) => void;
    setTextColor: (r: number, g: number, b: number) => void;
    text: (
      text: string,
      x: number,
      y: number,
      options?: { align?: "left" | "center" | "right" },
    ) => void;
  },
  meta: ReturnType<typeof buildExportElement>["meta"],
): void {
  const pageCount = pdf.getNumberOfPages();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 14;
  const footerTop = pageHeight - PDF_FOOTER_HEIGHT_MM;

  for (let page = 1; page <= pageCount; page += 1) {
    pdf.setPage(page);
    pdf.setFillColor(251, 247, 240);
    pdf.rect(0, footerTop - 2, pageWidth, PDF_FOOTER_HEIGHT_MM + 2, "F");
    pdf.setDrawColor(216, 216, 232);
    pdf.setLineWidth(0.2);
    pdf.line(margin, footerTop, pageWidth - margin, footerTop);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);
    pdf.setTextColor(122, 122, 154);
    pdf.text(
      `${meta.documentId} · ${meta.direction}`,
      margin,
      footerTop + 5,
    );
    pdf.text(
      `Source: ${meta.sourceStats}  |  Output: ${meta.outputStats}`,
      margin,
      footerTop + 9,
    );
    pdf.text(meta.generatedAt, margin, footerTop + 13);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7);
    pdf.setTextColor(26, 107, 107);
    pdf.text(meta.siteLine, pageWidth - margin, footerTop + 5, { align: "right" });
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(122, 122, 154);
    pdf.text(`Page ${page} of ${pageCount}`, pageWidth - margin, footerTop + 13, {
      align: "right",
    });
  }
}

export async function downloadTranslationPdf(payload: PdfExportPayload): Promise<void> {
  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const { root, meta } = buildExportElement(payload);
  document.body.appendChild(root);

  try {
    const canvas = await html2canvas(root.firstElementChild as HTMLElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: BRAND.bg,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const contentHeight = pageHeight - PDF_FOOTER_HEIGHT_MM;
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= contentHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= contentHeight;
    }

    addPdfFooters(pdf, meta);

    const stamp = meta.documentId.replace(/^AAT-/, "");
    pdf.save(`al-andalus-translation-${stamp}.pdf`);
  } finally {
    document.body.removeChild(root);
  }
}
