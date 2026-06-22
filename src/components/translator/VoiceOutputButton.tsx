"use client";

import { cn } from "@/lib/utils";
import { Volume2, VolumeX } from "lucide-react";

type VoiceOutputButtonProps = {
  speaking: boolean;
  supported: boolean;
  disabled?: boolean;
  onClick: () => void;
  className?: string;
};

export function VoiceOutputButton({
  speaking,
  supported,
  disabled,
  onClick,
  className,
}: VoiceOutputButtonProps) {
  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={speaking}
      aria-label={speaking ? "Detener lectura en voz alta" : "Escuchar traducción"}
      title={speaking ? "Detener audio" : "Escuchar"}
      className={cn(
        "interactive-scale icon-btn-interactive inline-flex h-9 w-9 items-center justify-center rounded-full border",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
        "disabled:pointer-events-none disabled:opacity-50",
        speaking
          ? "border-secondary bg-secondary/15 text-secondary"
          : "border-border bg-surface text-primary hover:border-secondary/50 hover:bg-section-primary-mist",
        className,
      )}
    >
      {speaking ? (
        <VolumeX className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
      ) : (
        <Volume2 className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
      )}
    </button>
  );
}
