"use client";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { downloadTranslationPdf } from "@/lib/exportTranslationPdf";
import { openEmailShare, openWhatsAppShare, type SharePayload } from "@/lib/shareTranslation";
import { cn } from "@/lib/utils";
import { Check, Copy, FileDown, Loader2, Mail } from "lucide-react";
import { useCallback, useState } from "react";

type TranslationActionsProps = {
  payload: SharePayload | null;
  disabled?: boolean;
  className?: string;
};

type Feedback = "copy" | "pdf" | null;

export function TranslationActions({ payload, disabled, className }: TranslationActionsProps) {
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const hasOutput = Boolean(payload?.output?.trim());
  const isDisabled = disabled || !hasOutput;

  const onCopy = useCallback(async () => {
    if (!payload?.output) return;
    setActionError(null);
    try {
      await navigator.clipboard.writeText(payload.output);
      setFeedback("copy");
      setTimeout(() => setFeedback(null), 2000);
    } catch {
      setActionError("No se pudo copiar. Selecciona el texto y cópialo manualmente.");
    }
  }, [payload]);

  const onWhatsApp = useCallback(() => {
    if (!payload) return;
    setActionError(null);
    openWhatsAppShare(payload);
  }, [payload]);

  const onEmail = useCallback(() => {
    if (!payload) return;
    setActionError(null);
    openEmailShare(payload);
  }, [payload]);

  const onPdf = useCallback(async () => {
    if (!payload) return;
    setActionError(null);
    setPdfLoading(true);
    try {
      await downloadTranslationPdf(payload);
      setFeedback("pdf");
      setTimeout(() => setFeedback(null), 2000);
    } catch {
      setActionError("No se pudo crear el PDF. Inténtalo de nuevo o usa Copiar / Correo.");
    } finally {
      setPdfLoading(false);
    }
  }, [payload]);

  return (
    <div className={cn("translation-actions space-y-2 text-center md:text-start", className)}>
      <p className="translation-actions__label">Compartir o exportar</p>
      <div className="translation-actions__row">
        <button
          type="button"
          disabled={isDisabled}
          onClick={() => void onCopy()}
          className="translation-actions__btn interactive-scale"
        >
          {feedback === "copy" ? (
            <>
              <Check className="h-4 w-4" aria-hidden />
              Copiado
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" aria-hidden />
              Copiar
            </>
          )}
        </button>

        <button
          type="button"
          disabled={isDisabled}
          onClick={onWhatsApp}
          className="translation-actions__btn translation-actions__btn--whatsapp interactive-scale"
          aria-label="Compartir traducción en WhatsApp"
        >
          <WhatsAppIcon className="h-4 w-4" />
          WhatsApp
        </button>

        <button
          type="button"
          disabled={isDisabled || pdfLoading}
          onClick={() => void onPdf()}
          className="translation-actions__btn interactive-scale"
        >
          {pdfLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              PDF…
            </>
          ) : feedback === "pdf" ? (
            <>
              <Check className="h-4 w-4" aria-hidden />
              Descargado
            </>
          ) : (
            <>
              <FileDown className="h-4 w-4" aria-hidden />
              Exportar PDF
            </>
          )}
        </button>

        <button
          type="button"
          disabled={isDisabled}
          onClick={onEmail}
          className="translation-actions__btn interactive-scale"
        >
          <Mail className="h-4 w-4" aria-hidden />
          Correo
        </button>
      </div>
      {actionError && (
        <p role="alert" className="type-small text-error">
          {actionError}
        </p>
      )}
    </div>
  );
}
