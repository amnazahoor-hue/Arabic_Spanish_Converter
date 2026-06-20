import { isArabicLang, MAX_TRANSLATE_CHARS, type LanguageCode } from "@/lib/constants";
import { TranslateProviderError, translate } from "@/lib/translate";
import { NextResponse } from "next/server";
import { z } from "zod";

const languageSchema = z.enum(["ar", "ar-ma", "es"]);

const bodySchema = z.object({
  text: z.string().min(1).max(MAX_TRANSLATE_CHARS),
  from: languageSchema,
  to: languageSchema,
});

const rateMap = new Map<string, { count: number; reset: number }>();
const RATE_LIMIT = 30;
const RATE_WINDOW_MS = 60_000;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + RATE_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count += 1;
  return true;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Wait a minute and try again." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid data. Check the text and selected languages." },
      { status: 400 },
    );
  }

  const { text, from, to } = parsed.data;
  if (from === to) {
    return NextResponse.json(
      { error: "Source and target languages must be different." },
      { status: 400 },
    );
  }

  const fromIsArabic = isArabicLang(from);
  const toIsArabic = isArabicLang(to);
  if (fromIsArabic === toIsArabic) {
    return NextResponse.json(
      { error: "Select one Arabic dialect and Spanish." },
      { status: 400 },
    );
  }

  if (!/^[\s\S]*$/.test(text) || /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(text)) {
    return NextResponse.json(
      { error: "Text contains unsupported characters.", code: "UNSUPPORTED" },
      { status: 400 },
    );
  }

  try {
    const translatedText = await translate({ text, from, to });
    return NextResponse.json({ translatedText, from, to });
  } catch (err) {
    if (err instanceof TranslateProviderError) {
      const status =
        err.code === "QUOTA_DAILY"
          ? 429
          : err.code === "REQUEST_TOO_LARGE"
            ? 413
            : err.code === "NOT_CONFIGURED"
              ? 503
              : 502;
      return NextResponse.json({ error: err.message, code: err.code }, { status });
    }
    return NextResponse.json(
      {
        error: "Translation server error. Please try again in a moment.",
        code: "PROVIDER",
      },
      { status: 502 },
    );
  }
}
