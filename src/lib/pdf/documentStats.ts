export function countCharacters(text: string): number {
  return [...text].length;
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

export function createDocumentReference(): string {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const seq = String(date.getTime() % 10000).padStart(4, "0");
  return `AAT-${y}${m}${d}-${seq}`;
}

export function formatGeneratedAt(date: Date = new Date()): string {
  return date.toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });
}

/** jsPDF Helvetica only supports WinAnsi — keep footer text ASCII-only. */
export function formatPdfFooterDirection(sourceLabel: string, targetLabel: string): string {
  return `${sourceLabel} to ${targetLabel}`;
}

export function formatPdfFooterStats(chars: number, words: number): string {
  return `${chars.toLocaleString()} chars, ${words.toLocaleString()} words`;
}
