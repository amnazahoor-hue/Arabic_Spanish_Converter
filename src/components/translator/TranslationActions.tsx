"use client";

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/Button";
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

  const onCopy = useCallback(async () => {
    if (!payload?.output) return;
    setActionError(null);
    try {
      await navigator.clipboard.writeText(payload.output);
      setFeedback("copy");
      setTimeout(() => setFeedback(null), 2000);
    } catch {
      setActionError("Copy failed. Select the text and copy manually.");
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
      setActionError("Could not create PDF. Try again or use Copy / Email.");
    } finally {
      setPdfLoading(false);
    }
  }, [payload]);

  return (
    <div className={cn("space-y-2 text-center md:text-start", className)}>
      <p className="type-small font-medium text-muted">Share or export</p>
      <div className="flex flex-wrap justify-center gap-2 md:justify-start">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || !hasOutput}
          onClick={() => void onCopy()}
          className="min-w-0"
        >
          {feedback === "copy" ? (
            <>
              <Check className="h-4 w-4 shrink-0" aria-hidden />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 shrink-0" aria-hidden />
              Copy
            </>
          )}
        </Button>

        <button
          type="button"
          disabled={disabled || !hasOutput}
          onClick={onWhatsApp}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] px-4 py-2",
            "text-[0.875rem] font-medium text-white border border-transparent",
            "bg-[#25D366] hover:bg-[#20BD5A] transition-colors",
            "disabled:opacity-50 disabled:pointer-events-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2",
          )}
          aria-label="Share translation on WhatsApp"
        >
          <WhatsAppIcon className="h-4 w-4 shrink-0" />
          WhatsApp
        </button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || !hasOutput || pdfLoading}
          onClick={() => void onPdf()}
        >
          {pdfLoading ? (
            <>
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
              PDF…
            </>
          ) : feedback === "pdf" ? (
            <>
              <Check className="h-4 w-4 shrink-0" aria-hidden />
              Downloaded
            </>
          ) : (
            <>
              <FileDown className="h-4 w-4 shrink-0" aria-hidden />
              Export PDF
            </>
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || !hasOutput}
          onClick={onEmail}
        >
          <Mail className="h-4 w-4 shrink-0" aria-hidden />
          Email
        </Button>
      </div>
      {actionError && (
        <p role="alert" className="type-small text-error">
          {actionError}
        </p>
      )}
    </div>
  );
}
