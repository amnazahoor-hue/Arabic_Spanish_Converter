"use client";

import { Button } from "@/components/ui/Button";
import { LanguageSwap } from "@/components/ui/LanguageSwap";
import { Skeleton } from "@/components/ui/Skeleton";
import { Spinner } from "@/components/ui/Spinner";
import { TextArea } from "@/components/ui/TextArea";
import { TranslationActions } from "@/components/translator/TranslationActions";
import { useTranslator } from "@/hooks/useTranslator";
import {
  LANGUAGES,
  MAX_TRANSLATE_CHARS,
  MYMEMORY_MAX_BYTES_PER_REQUEST,
  MYMEMORY_MAX_CHARS_PER_DAY,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

export function TranslatorPanel() {
  const t = useTranslator("ar");

  const sourceDir = LANGUAGES[t.sourceLang].dir;
  const targetDir = LANGUAGES[t.targetLang].dir;

  const sharePayload =
    t.output.trim().length > 0
      ? {
          sourceLang: t.sourceLang,
          targetLang: t.targetLang,
          input: t.input.trim(),
          output: t.output.trim(),
        }
      : null;

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      void t.translateText();
    }
  };

  return (
    <div className="mx-auto max-w-4xl min-w-0 space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="type-h2-section">Arabic ↔ Spanish translator</h2>
        <p className="type-body prose-width mx-auto">
          Instant translation in both directions. Use the center button to swap languages.
        </p>
      </div>

      <LanguageSwap source={t.sourceLang} target={t.targetLang} onSwap={t.swapLanguages} />

      <div className="grid min-w-0 gap-6 md:grid-cols-2">
        <div className="min-w-0 space-y-2">
          <TextArea
            label={`Text in ${LANGUAGES[t.sourceLang].label}`}
            dir={sourceDir}
            value={t.input}
            onChange={(e) => t.setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={8}
            placeholder={
              t.sourceLang === "ar"
                ? "اكتب أو الصق النص هنا…"
                : "Type or paste your text here…"
            }
            error={t.errorCode === "EMPTY_INPUT" ? (t.error ?? undefined) : undefined}
            hint={`${t.charCount} / ${MAX_TRANSLATE_CHARS} characters · max ${MYMEMORY_MAX_BYTES_PER_REQUEST} bytes per request · ~${MYMEMORY_MAX_CHARS_PER_DAY.toLocaleString("en-US")} chars/day (free tier) · Ctrl+Enter`}
          />
          {t.error && t.errorCode !== "EMPTY_INPUT" && (
            <p role="alert" className="type-small text-error">
              {t.error}
            </p>
          )}
          <div className="flex justify-center md:justify-start">
            <Button
              type="button"
              size="lg"
              className="w-full sm:w-auto"
              disabled={t.loading}
              onClick={() => void t.translateText()}
            >
              {t.loading ? "Translating…" : "Translate"}
            </Button>
          </div>
        </div>

        <div className="flex min-w-0 flex-col">
          <label className="mb-2 block text-nav-mobile font-medium text-heading md:text-nav">
            Result ({LANGUAGES[t.targetLang].label})
          </label>
          <div
            className={cn(
              "min-h-[12rem] w-full min-w-0 flex-1 rounded-[var(--radius)] border border-border bg-surface px-4 py-3",
              targetDir === "rtl" && "font-arabic text-start",
            )}
            dir={targetDir}
            aria-live="polite"
            aria-busy={t.loading}
          >
            {t.loading ? (
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <Spinner size="lg" label="Translating" />
                <Skeleton lines={4} className="w-full" />
              </div>
            ) : t.output ? (
              <p className="type-body break-words whitespace-pre-wrap">{t.output}</p>
            ) : (
              <p className="type-small text-muted">Your translation will appear here.</p>
            )}
          </div>

          <TranslationActions className="mt-4" payload={sharePayload} disabled={t.loading} />
        </div>
      </div>
    </div>
  );
}
