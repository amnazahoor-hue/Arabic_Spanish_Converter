import { SITE_IMAGES } from "@/content/site-images";

export const PDF_LOGO_SRC = "/images/logo.webp";

const LOGO_ASPECT = 580 / 324;

export function buildPdfLogoHtml(logoDataUrl: string, siteName: string): string {
  const height = 52;
  const width = Math.round(height * LOGO_ASPECT);
  const alt = SITE_IMAGES.logo.alt.replace(/"/g, "&quot;");
  const title = SITE_IMAGES.logo.description.replace(/"/g, "&quot;");

  return `<img src="${logoDataUrl}" alt="${alt}" title="${title}" width="${width}" height="${height}" style="display:block;object-fit:contain;object-position:right center;" />`;
}

export async function loadPdfLogoDataUrl(): Promise<string> {
  const src = new URL(PDF_LOGO_SRC, window.location.origin).href;
  const response = await fetch(src);

  if (!response.ok) {
    throw new Error("Failed to load logo for PDF export.");
  }

  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read logo for PDF export."));
    reader.readAsDataURL(blob);
  });
}
