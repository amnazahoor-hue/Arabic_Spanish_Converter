import type { LanguageCode } from "@/lib/constants";

export const SPEECH_LANG: Record<LanguageCode, string> = {
  ar: "ar-SA",
  "ar-ma": "ar-MA",
  es: "es-ES",
};

export function getSpeechRecognitionCtor(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

export function isSpeechRecognitionSupported(): boolean {
  return getSpeechRecognitionCtor() !== null;
}

export function isSpeechSynthesisSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
