import {
  MYMEMORY_MAX_BYTES_PER_REQUEST,
  MYMEMORY_MAX_CHARS_PER_DAY,
  type LanguageCode,
} from "@/lib/constants";

export { MYMEMORY_MAX_BYTES_PER_REQUEST, MYMEMORY_MAX_CHARS_PER_DAY };

export type TranslateParams = {
  text: string;
  from: LanguageCode;
  to: LanguageCode;
};

export type TranslateErrorCode =
  | "QUOTA_DAILY"
  | "REQUEST_TOO_LARGE"
  | "PROVIDER"
  | "NOT_CONFIGURED";

export class TranslateProviderError extends Error {
  readonly code: TranslateErrorCode;

  constructor(message: string, code: TranslateErrorCode = "PROVIDER") {
    super(message);
    this.name = "TranslateProviderError";
    this.code = code;
  }
}

type MyMemoryResponse = {
  responseStatus?: number;
  responseDetails?: string;
  responseData?: { translatedText?: string };
  quotaFinished?: boolean;
  matches?: unknown[];
};

function utf8ByteLength(value: string): number {
  return new TextEncoder().encode(value).length;
}

export function splitTextForMyMemory(text: string, maxBytes: number): string[] {
  if (utf8ByteLength(text) <= maxBytes) return [text];

  const chunks: string[] = [];
  const paragraphs = text.split(/(\n{2,})/);

  let buffer = "";

  const flushBuffer = () => {
    if (!buffer) return;
    if (utf8ByteLength(buffer) <= maxBytes) {
      chunks.push(buffer);
      buffer = "";
      return;
    }
    chunks.push(...splitByBytes(buffer, maxBytes));
    buffer = "";
  };

  for (const part of paragraphs) {
    const candidate = buffer + part;
    if (utf8ByteLength(candidate) <= maxBytes) {
      buffer = candidate;
      continue;
    }
    flushBuffer();
    if (utf8ByteLength(part) <= maxBytes) {
      buffer = part;
    } else {
      const words = part.split(/(\s+)/);
      for (const word of words) {
        const next = buffer + word;
        if (utf8ByteLength(next) <= maxBytes) {
          buffer = next;
        } else {
          flushBuffer();
          if (utf8ByteLength(word) <= maxBytes) {
            buffer = word;
          } else {
            chunks.push(...splitByBytes(word, maxBytes));
          }
        }
      }
    }
  }
  flushBuffer();

  return chunks.length > 0 ? chunks : [text];
}

function splitByBytes(text: string, maxBytes: number): string[] {
  const chunks: string[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    if (utf8ByteLength(remaining) <= maxBytes) {
      chunks.push(remaining);
      break;
    }

    let low = 0;
    let high = remaining.length;

    while (low < high) {
      const mid = Math.ceil((low + high) / 2);
      const slice = remaining.slice(0, mid);
      if (utf8ByteLength(slice) <= maxBytes) low = mid;
      else high = mid - 1;
    }

    if (low === 0) {
      throw new TranslateProviderError(
        "Part of the text exceeds the free per-request limit (500 bytes). Shorten or simplify that segment.",
        "REQUEST_TOO_LARGE",
      );
    }

    chunks.push(remaining.slice(0, low));
    remaining = remaining.slice(low);
  }

  return chunks;
}

function mapMyMemoryFailure(data: MyMemoryResponse): never {
  if (data.quotaFinished) {
    throw new TranslateProviderError(
      `You have reached MyMemory's free daily limit (${MYMEMORY_MAX_CHARS_PER_DAY.toLocaleString("en-US")} translated characters per day). Try again tomorrow or configure a paid provider (e.g. Azure) on the server.`,
      "QUOTA_DAILY",
    );
  }

  const details = (data.responseDetails ?? "").toUpperCase();

  if (data.responseStatus === 403 || details.includes("QUOTA")) {
    throw new TranslateProviderError(
      `Free tier usage limit reached (${MYMEMORY_MAX_CHARS_PER_DAY.toLocaleString("en-US")} characters/day). Please try again later.`,
      "QUOTA_DAILY",
    );
  }

  if (
    details.includes("500") ||
    details.includes("BYTE") ||
    details.includes("LENGTH") ||
    details.includes("TOO LONG")
  ) {
    throw new TranslateProviderError(
      `This segment exceeds the free plan maximum of ${MYMEMORY_MAX_BYTES_PER_REQUEST} bytes per request. Split the text into shorter parts.`,
      "REQUEST_TOO_LARGE",
    );
  }

  throw new TranslateProviderError(
    "Could not translate the text. Check the languages and try again.",
    "PROVIDER",
  );
}

async function fetchMyMemoryChunk(
  text: string,
  from: LanguageCode,
  to: LanguageCode,
): Promise<string> {
  const byteLen = utf8ByteLength(text);
  if (byteLen > MYMEMORY_MAX_BYTES_PER_REQUEST) {
    throw new TranslateProviderError(
      `Each free-tier request allows at most ${MYMEMORY_MAX_BYTES_PER_REQUEST} UTF-8 bytes. This segment is ${byteLen} bytes — please shorten it.`,
      "REQUEST_TOO_LARGE",
    );
  }

  const langpair = `${from}|${to}`;
  const url = new URL(
    process.env.TRANSLATE_API_URL ?? "https://api.mymemory.translated.net/get",
  );
  url.searchParams.set("q", text);
  url.searchParams.set("langpair", langpair);

  const apiKey = process.env.TRANSLATE_API_KEY;
  if (apiKey) url.searchParams.set("key", apiKey);

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok) {
    throw new TranslateProviderError(
      "The translation service did not respond correctly. Please try again in a moment.",
      "PROVIDER",
    );
  }

  const data = (await res.json()) as MyMemoryResponse;

  if (data.quotaFinished) {
    mapMyMemoryFailure(data);
  }

  const translated = data.responseData?.translatedText?.trim();

  if (!translated || (data.responseStatus && data.responseStatus >= 400)) {
    mapMyMemoryFailure(data);
  }

  if (translated === text && byteLen > 80) {
    const status = data.responseStatus ?? 200;
    if (status !== 200) mapMyMemoryFailure(data);
  }

  return translated;
}

async function translateMyMemory(params: TranslateParams): Promise<string> {
  const { text, from, to } = params;
  const trimmed = text.trim();

  if (!trimmed) {
    throw new TranslateProviderError("Text is empty.", "PROVIDER");
  }

  if (trimmed.length > MYMEMORY_MAX_CHARS_PER_DAY) {
    throw new TranslateProviderError(
      `Text exceeds the free tier daily guideline (${MYMEMORY_MAX_CHARS_PER_DAY.toLocaleString("en-US")} characters per day). Send less text or return when the quota resets.`,
      "QUOTA_DAILY",
    );
  }

  const chunks = splitTextForMyMemory(trimmed, MYMEMORY_MAX_BYTES_PER_REQUEST);
  const parts: string[] = [];

  for (const chunk of chunks) {
    try {
      parts.push(await fetchMyMemoryChunk(chunk, from, to));
    } catch (err) {
      if (err instanceof TranslateProviderError && err.code === "QUOTA_DAILY") {
        throw err;
      }
      if (parts.length > 0) {
        throw new TranslateProviderError(
          "Translation stopped partway (free limit or provider error). Shorten the text and try again.",
          err instanceof TranslateProviderError ? err.code : "PROVIDER",
        );
      }
      throw err;
    }
  }

  return parts.join("");
}

async function translateAzure(): Promise<string> {
  const key = process.env.AZURE_TRANSLATOR_KEY;
  const region = process.env.AZURE_TRANSLATOR_REGION;

  if (!key || !region) {
    throw new TranslateProviderError(
      "Azure Translator is not configured. Set AZURE_TRANSLATOR_KEY and AZURE_TRANSLATOR_REGION on the server.",
      "NOT_CONFIGURED",
    );
  }

  throw new TranslateProviderError(
    "The Azure Translator adapter is not implemented yet. Use TRANSLATE_PROVIDER=mymemory or complete translateAzure() in lib/translate.ts.",
    "NOT_CONFIGURED",
  );
}

type ProviderAdapter = (params: TranslateParams) => Promise<string>;

const adapters: Record<string, ProviderAdapter> = {
  mymemory: translateMyMemory,
  azure: translateAzure,
};

export async function translate(params: TranslateParams): Promise<string> {
  const provider = (process.env.TRANSLATE_PROVIDER ?? "mymemory").toLowerCase();
  const adapter = adapters[provider];

  if (!adapter) {
    throw new TranslateProviderError(
      `Provider "${provider}" is not recognized. Supported values: ${Object.keys(adapters).join(", ")}.`,
      "NOT_CONFIGURED",
    );
  }

  return adapter(params);
}
