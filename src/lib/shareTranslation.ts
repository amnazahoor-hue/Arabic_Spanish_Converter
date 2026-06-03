import { LANGUAGES, SITE_CONFIG, type LanguageCode } from "@/lib/constants";
import { getPublicSiteUrl } from "@/lib/publicSiteUrl";

export type SharePayload = {
  sourceLang: LanguageCode;
  targetLang: LanguageCode;
  input: string;
  output: string;
};

function buildShareMessageLines(
  sourceLang: LanguageCode,
  targetLang: LanguageCode,
  input: string,
  output: string,
): string[] {
  const from = LANGUAGES[sourceLang].label;
  const to = LANGUAGES[targetLang].label;
  const lines = [
    `*${SITE_CONFIG.name}*`,
    `${from} → ${to}`,
    "",
    "*Translation:*",
    output,
    "",
    "_Original:_",
    input.slice(0, 500) + (input.length > 500 ? "…" : ""),
  ];

  const publicUrl = getPublicSiteUrl();
  if (publicUrl) {
    lines.push("", publicUrl);
  }

  return lines;
}

export function buildWhatsAppShareUrl({ sourceLang, targetLang, input, output }: SharePayload): string {
  const message = buildShareMessageLines(sourceLang, targetLang, input, output).join("\n");
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppShare(payload: SharePayload): void {
  window.open(buildWhatsAppShareUrl(payload), "_blank", "noopener,noreferrer");
}

export function openEmailShare({ sourceLang, targetLang, input, output }: SharePayload): void {
  const from = LANGUAGES[sourceLang].label;
  const to = LANGUAGES[targetLang].label;
  const subject = `${SITE_CONFIG.name} — ${from} to ${to} translation`;

  const bodyLines = [`Translation created with ${SITE_CONFIG.name}`];
  const publicUrl = getPublicSiteUrl();
  if (publicUrl) {
    bodyLines.push(publicUrl, "");
  } else {
    bodyLines.push("");
  }
  bodyLines.push(
    `Direction: ${from} → ${to}`,
    "",
    "--- Original ---",
    input,
    "",
    "--- Translation ---",
    output,
  );

  const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
  window.location.href = mailto;
}
