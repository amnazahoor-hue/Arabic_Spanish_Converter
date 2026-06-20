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

type TranslatorPanelProps = {
  variant?: "default" | "hero";
  id?: string;
};

export function TranslatorPanel({ variant = "default", id }: TranslatorPanelProps) {
  const t = useTranslator("ar");
  const isHero = variant === "hero";

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
    <div
      id={id}
      className={cn(
        "mx-auto min-w-0 space-y-6",
        isHero ? "w-full max-w-none" : "max-w-4xl",
      )}
    >
      {!isHero && (
        <div className="space-y-2 text-center">
          <h2 className="type-h2-section">Traductor Árabe ↔ Español</h2>
          <p className="type-body prose-width mx-auto">
            Traducción instantánea en ambas direcciones. Usa el botón central para intercambiar idiomas.
          </p>
        </div>
      )}

      <LanguageSwap source={t.sourceLang} target={t.targetLang} onSwap={t.swapLanguages} />

      <div className={cn("grid min-w-0 gap-6", isHero ? "grid-cols-1 xl:grid-cols-2" : "md:grid-cols-2")}>
        <div className="min-w-0 space-y-2">
          <TextArea
            label={`Texto en ${LANGUAGES[t.sourceLang].nativeLabel}`}
            dir={sourceDir}
            value={t.input}
            onChange={(e) => t.setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={isHero ? 6 : 8}
            placeholder={
              t.sourceLang === "ar"
                ? "اكتب أو الصق النص هنا…"
                : "Escribe o pega tu texto aquí…"
            }
            error={t.errorCode === "EMPTY_INPUT" ? (t.error ?? undefined) : undefined}
            hint={`${t.charCount} / ${MAX_TRANSLATE_CHARS} caracteres · máx. ${MYMEMORY_MAX_BYTES_PER_REQUEST} bytes por solicitud · ~${MYMEMORY_MAX_CHARS_PER_DAY.toLocaleString("es-ES")} caracteres/día (plan gratuito) · Ctrl+Intro`}
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
              {t.loading ? "Traduciendo…" : "Traducir aquí"}
            </Button>
          </div>
        </div>

        <div className="flex min-w-0 flex-col">
          <label className="mb-2 block text-nav-mobile font-medium text-heading md:text-nav">
            Resultado ({LANGUAGES[t.targetLang].nativeLabel})
          </label>
          <div
            className={cn(
              "min-h-[12rem] w-full min-w-0 flex-1 rounded-[var(--radius)] border border-border bg-surface px-4 py-3",
              isHero && "min-h-[10rem]",
              targetDir === "rtl" && "font-arabic text-start",
            )}
            dir={targetDir}
            aria-live="polite"
            aria-busy={t.loading}
          >
            {t.loading ? (
              <div className="flex flex-col items-center justify-center gap-4 py-8">
                <Spinner size="lg" label="Traduciendo" />
                <Skeleton lines={4} className="w-full" />
              </div>
            ) : t.output ? (
              <p className="type-body break-words whitespace-pre-wrap">{t.output}</p>
            ) : (
              <p className="type-small text-muted">Tu traducción aparecerá aquí.</p>
            )}
          </div>

          <TranslationActions className="mt-4" payload={sharePayload} disabled={t.loading} />
        </div>
      </div>
    </div>
  );
}
