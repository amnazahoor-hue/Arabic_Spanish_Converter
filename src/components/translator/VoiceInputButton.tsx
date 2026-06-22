"use client";

import { cn } from "@/lib/utils";
import { Mic, MicOff } from "lucide-react";

type VoiceInputButtonProps = {
  listening: boolean;
  supported: boolean;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
};

export function VoiceInputButton({
  listening,
  supported,
  disabled,
  onClick,
  className,
}: VoiceInputButtonProps) {
  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={listening}
      aria-label={listening ? "Detener grabación de voz" : "Dictar con el micrófono"}
      title={listening ? "Detener" : "Hablar"}
      className={cn(
        "interactive-scale icon-btn-interactive inline-flex h-9 w-9 items-center justify-center rounded-full border",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        "disabled:pointer-events-none disabled:opacity-50",
        listening
          ? "border-error/50 bg-error/10 text-error motion-safe:animate-pulse"
          : "border-border bg-surface text-primary hover:border-primary/50 hover:bg-section-primary-mist",
        className,
      )}
    >
      {listening ? (
        <MicOff className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
      ) : (
        <Mic className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
      )}
    </button>
  );
}
