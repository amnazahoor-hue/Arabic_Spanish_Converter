export const PDF_LOGO_SRC = "/images/logo.webp";

const LOGO_ASPECT = 580 / 324;

export function buildPdfLogoHtml(logoDataUrl: string, siteName: string): string {
  const height = 52;
  const width = Math.round(height * LOGO_ASPECT);

  return `<img src="${logoDataUrl}" alt="${siteName.replace(/"/g, "&quot;")}" width="${width}" height="${height}" style="display:block;object-fit:contain;object-position:right center;" />`;
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
