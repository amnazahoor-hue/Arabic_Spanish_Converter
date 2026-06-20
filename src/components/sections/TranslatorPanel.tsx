"use client";

import { Button } from "@/components/ui/Button";
import { LanguageSwap } from "@/components/ui/LanguageSwap";
import { Skeleton } from "@/components/ui/Skeleton";
import { Spinner } from "@/components/ui/Spinner";
import { TextArea } from "@/components/ui/TextArea";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TranslationActions } from "@/components/translator/TranslationActions";
import { VoiceInputButton } from "@/components/translator/VoiceInputButton";
import { VoiceOutputButton } from "@/components/translator/VoiceOutputButton";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { useTranslator } from "@/hooks/useTranslator";
import {
  LANGUAGES,
  MAX_TRANSLATE_CHARS,
  MYMEMORY_MAX_BYTES_PER_REQUEST,
  MYMEMORY_MAX_CHARS_PER_DAY,
  type LanguageCode,
} from "@/lib/constants";
import { SPEECH_LANG } from "@/lib/speech";
import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

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
  const baseInputRef = useRef("");

  const voiceInput = useSpeechRecognition(SPEECH_LANG[t.sourceLang]);
  const voiceOutput = useSpeechSynthesis(SPEECH_LANG[t.targetLang]);

  const sourceDir = LANGUAGES[t.sourceLang].dir;
  const targetDir = LANGUAGES[t.targetLang].dir;

  useEffect(() => {
    voiceInput.stop();
    voiceInput.clearError();
  }, [t.sourceLang]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    voiceOutput.stop();
  }, [t.targetLang]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const handleVoiceResult = useCallback(
    (transcript: string, isFinal: boolean) => {
      if (isFinal) {
        const combined = baseInputRef.current.trim()
          ? `${baseInputRef.current.trim()} ${transcript}`
          : transcript;
        void t.translateFromText(combined);
        baseInputRef.current = "";
        return;
      }

      const preview = baseInputRef.current.trim()
        ? `${baseInputRef.current.trim()} ${transcript}`
        : transcript;
      t.setInput(preview);
    },
    [t],
  );

  const onVoiceInputClick = useCallback(() => {
    voiceInput.clearError();
    if (!voiceInput.listening) {
      baseInputRef.current = t.input;
    }
    voiceInput.toggle(handleVoiceResult);
  }, [voiceInput, handleVoiceResult, t.input]);

  const handleRestore = useCallback(() => {
    voiceInput.stop();
    voiceInput.clearError();
    voiceOutput.stop();
    baseInputRef.current = "";
    t.reset();
  }, [t, voiceInput, voiceOutput]);

  const isDefaultState = t.isDefault;

  const sourcePlaceholder =
    t.sourceLang === "ar-ma"
      ? "Escribe darija aquí (árabe o latinas)…"
      : t.sourceLang === "ar"
        ? "اكتب أو الصق النص هنا…"
        : "Escribe, pega o dicta tu texto aquí…";

  const voiceHint = voiceInput.supported ? " · micrófono para dictar" : "";

  return (
    <div
      id={id}
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
            {voiceInput.supported || voiceOutput.supported ? " o el micrófono para dictar." : "."}
          </p>
        </div>
      )}

      <div className="flex items-center justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="gap-1.5"
          disabled={t.loading || voiceInput.listening || isDefaultState}
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
            label={`Texto en ${LANGUAGES[t.sourceLang].nativeLabel}`}
            dir={sourceDir}
            value={t.input}
            onChange={(e) => t.setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={isHero ? 6 : 8}
            placeholder={sourcePlaceholder}
            error={t.errorCode === "EMPTY_INPUT" ? (t.error ?? undefined) : undefined}
            hint={`${t.charCount} / ${MAX_TRANSLATE_CHARS} caracteres · máx. ${MYMEMORY_MAX_BYTES_PER_REQUEST} bytes por solicitud · ~${MYMEMORY_MAX_CHARS_PER_DAY.toLocaleString("es-ES")} caracteres/día (plan gratuito) · Ctrl+Intro${voiceHint}`}
            action={
              voiceInput.supported ? (
                <VoiceInputButton
                  listening={voiceInput.listening}
                  supported={voiceInput.supported}
                  disabled={t.loading}
                  onClick={onVoiceInputClick}
                />
              ) : undefined
            }
          />
          {voiceInput.listening && (
            <p className="type-small text-primary" role="status">
              Escuchando… habla ahora.
            </p>
          )}
          {voiceInput.error && (
            <p role="alert" className="type-small text-error">
              {voiceInput.error}
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
              disabled={t.loading || voiceInput.listening}
              onClick={() => void t.translateText()}
            >
              {t.loading ? "Traduciendo…" : "Traducir aquí"}
            </Button>
          </div>
        </div>

        <div className="flex min-w-0 flex-col">
          <div className="mb-2 flex items-center justify-between gap-3">
            <label className="block text-nav-mobile font-medium text-heading md:text-nav">
              Resultado ({LANGUAGES[t.targetLang].nativeLabel})
            </label>
            {voiceOutput.supported ? (
              <VoiceOutputButton
                speaking={voiceOutput.speaking}
                supported={voiceOutput.supported}
                disabled={t.loading || !t.output.trim()}
                onClick={() => voiceOutput.toggle(t.output)}
              />
            ) : null}
          </div>
          <div
            className={cn(
              "min-h-[12rem] w-full min-w-0 flex-1 rounded-[var(--radius)] border border-border bg-surface px-4 py-3 translator-output-panel",
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
