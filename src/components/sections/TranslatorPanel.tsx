"use client";

import { Button } from "@/components/ui/Button";
import { LanguageSwap } from "@/components/ui/LanguageSwap";
import { TextArea } from "@/components/ui/TextArea";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useTranslator } from "@/hooks/useTranslator";
import {
  LANGUAGES,
  type LanguageCode,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { RotateCcw } from "lucide-react";
import { useCallback, useId, useState } from "react";
import type { TranslatorVoiceInputState } from "@/components/translator/TranslatorVoiceInputAction";

const TranslationActions = dynamic(
  () => import("@/components/translator/TranslationActions").then((mod) => mod.TranslationActions),
  { ssr: false, loading: () => null },
);

const TranslatorVoiceInputAction = dynamic(
  () =>
    import("@/components/translator/TranslatorVoiceInputAction").then(
      (mod) => mod.TranslatorVoiceInputAction,
    ),
  { ssr: false, loading: () => null },
);

const TranslatorVoiceOutputButton = dynamic(
  () =>
    import("@/components/translator/TranslatorVoiceOutputButton").then(
      (mod) => mod.TranslatorVoiceOutputButton,
    ),
  { ssr: false, loading: () => null },
);

const TranslatorLoadingState = dynamic(
  () =>
    import("@/components/translator/TranslatorLoadingState").then(
      (mod) => mod.TranslatorLoadingState,
    ),
  { ssr: false, loading: () => null },
);

const EMPTY_VOICE_STATE: TranslatorVoiceInputState = {
  listening: false,
  error: null,
  supported: false,
};

type TranslatorPanelProps = {
  variant?: "default" | "hero";
  id?: string;
  /** Default source language — use `ar-ma` on the Moroccan Darija page. */
  initialFrom?: LanguageCode;
};

export function TranslatorPanel({
  variant = "default",
  id,
  initialFrom = "ar",
}: TranslatorPanelProps) {
  const t = useTranslator(initialFrom);
  const isHero = variant === "hero";
  const outputRegionId = useId();
  const outputLabelId = `${outputRegionId}-label`;
  const [voiceState, setVoiceState] = useState<TranslatorVoiceInputState>(EMPTY_VOICE_STATE);
  const [voiceResetKey, setVoiceResetKey] = useState(0);

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

  const handleVoicePreview = useCallback(
    (text: string) => {
      t.setInput(text);
    },
    [t],
  );

  const handleVoiceFinal = useCallback(
    (text: string) => {
      void t.translateFromText(text);
    },
    [t],
  );

  const handleRestore = useCallback(() => {
    setVoiceResetKey((key) => key + 1);
    t.reset();
  }, [t]);

  const isDefaultState = t.isDefault;

  const sourcePlaceholder =
    t.sourceLang === "ar-ma"
      ? "Escribe darija aquí (árabe o latinas)…"
      : t.sourceLang === "ar"
        ? "اكتب أو الصق النص هنا…"
        : "Escribe, pega o dicta tu texto aquí…";

  return (
    <div
      id={id}
      data-agentic="translator-tool"
      className={cn(
        "mx-auto min-w-0 space-y-6",
        isHero ? "w-full max-w-none" : "max-w-5xl",
      )}
    >
      {!isHero && (
        <div className="space-y-2 text-center">
          <h2 className="type-h2-section">Traductor Árabe ↔ Español</h2>
          <p className="type-body prose-width mx-auto">
            Traducción instantánea en ambas direcciones. Usa el botón central para intercambiar idiomas
            {voiceState.supported ? " o el micrófono para dictar." : "."}
          </p>
        </div>
      )}

      <div className="flex items-center justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-1.5"
          disabled={t.loading || voiceState.listening || isDefaultState}
          onClick={handleRestore}
          aria-label="Restaurar traductor"
        >
          <RotateCcw className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
          Restaurar
        </Button>
      </div>

      <LanguageSwap source={t.sourceLang} target={t.targetLang} onSwap={t.swapLanguages} />

      <div className={cn("grid min-w-0 gap-6", isHero ? "grid-cols-1 lg:grid-cols-2" : "md:grid-cols-2")}>
        <div className="min-w-0 space-y-2">
          <TextArea
            id="translator-input"
            data-agentic="translator-input"
            aria-label="Texto a traducir"
            label={`Texto en ${LANGUAGES[t.sourceLang].nativeLabel}`}
            dir={sourceDir}
            value={t.input}
            onChange={(e) => t.setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={isHero ? 6 : 8}
            placeholder={sourcePlaceholder}
            error={t.errorCode === "EMPTY_INPUT" ? (t.error ?? undefined) : undefined}
            action={
              <TranslatorVoiceInputAction
                sourceLang={t.sourceLang}
                input={t.input}
                loading={t.loading}
                resetKey={voiceResetKey}
                onPreview={handleVoicePreview}
                onFinal={handleVoiceFinal}
                onStateChange={setVoiceState}
              />
            }
          />
          {voiceState.listening && (
            <p className="type-small text-primary" role="status">
              Escuchando… habla ahora.
            </p>
          )}
          {voiceState.error && (
            <p role="alert" className="type-small text-error">
              {voiceState.error}
            </p>
          )}
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
              disabled={t.loading || voiceState.listening}
              onClick={() => void t.translateText()}
              aria-label={t.loading ? "Traduciendo texto" : "Traducir texto aquí"}
            >
              {t.loading ? "Traduciendo…" : "Traducir aquí"}
            </Button>
          </div>
        </div>

        <div className="flex min-w-0 flex-col">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p
              id={outputLabelId}
              className="block text-nav-mobile font-medium text-heading md:text-nav"
            >
              Resultado ({LANGUAGES[t.targetLang].nativeLabel})
            </p>
            <TranslatorVoiceOutputButton
              targetLang={t.targetLang}
              output={t.output}
              loading={t.loading}
              resetKey={voiceResetKey}
            />
          </div>
          <div
            id={outputRegionId}
            data-agentic="translator-output"
            role="region"
            aria-label="Texto traducido"
            aria-labelledby={outputLabelId}
            className={cn(
              "min-h-[12rem] w-full min-w-0 flex-1 rounded-[var(--radius)] border border-border bg-surface px-4 py-3 translator-output-panel",
              isHero && "min-h-[10rem]",
              targetDir === "rtl" && "font-arabic text-start",
            )}
            dir={targetDir}
            aria-live="polite"
            aria-busy={t.loading}
          >
            <div className="flex min-h-full flex-col gap-2">
              <div className="flex-1">
                {t.loading ? (
                  <TranslatorLoadingState />
                ) : t.output ? (
                  <p className="type-body break-words whitespace-pre-wrap">{t.output}</p>
                ) : (
                  <p className="type-small text-muted">Tu traducción aparecerá aquí.</p>
                )}
              </div>
              {!t.loading ? (
                <p className="type-small text-muted border-t border-border/60 pt-2">
                  Traducción instantánea de IA
                </p>
              ) : null}
            </div>
          </div>

          <TranslationActions className="mt-4" payload={sharePayload} disabled={t.loading} />
        </div>
      </div>
    </div>
  );
}
