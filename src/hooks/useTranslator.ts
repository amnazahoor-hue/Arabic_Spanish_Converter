"use client";

import { MAX_TRANSLATE_CHARS, type LanguageCode } from "@/lib/constants";
import type { TranslateErrorResponse, TranslateResponse } from "@/types";
import { useCallback, useState } from "react";

type TranslatorState = {
  sourceLang: LanguageCode;
  targetLang: LanguageCode;
  input: string;
  output: string;
  loading: boolean;
  error: string | null;
  errorCode: TranslateErrorResponse["code"] | null;
};

export function useTranslator(initialFrom: LanguageCode = "ar") {
  const [state, setState] = useState<TranslatorState>({
    sourceLang: initialFrom,
    targetLang: initialFrom === "ar" ? "es" : "ar",
    input: "",
    output: "",
    loading: false,
    error: null,
    errorCode: null,
  });

  const swapLanguages = useCallback(() => {
    setState((s) => ({
      ...s,
      sourceLang: s.targetLang,
      targetLang: s.sourceLang,
      input: s.output || s.input,
      output: s.output ? s.input : "",
      error: null,
      errorCode: null,
    }));
  }, []);

  const setInput = useCallback((input: string) => {
    setState((s) => ({
      ...s,
      input: input.slice(0, MAX_TRANSLATE_CHARS),
      error: null,
      errorCode: null,
    }));
  }, []);

  const translateText = useCallback(async () => {
    const trimmed = state.input.trim();
    if (!trimmed) {
      setState((s) => ({
        ...s,
        error: "Escribe o pega algún texto antes de traducir.",
        errorCode: "EMPTY_INPUT",
      }));
      return;
    }

    setState((s) => ({ ...s, loading: true, error: null, errorCode: null }));

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: trimmed,
          from: state.sourceLang,
          to: state.targetLang,
        }),
      });

      const data = (await res.json()) as TranslateResponse | TranslateErrorResponse;

      if (!res.ok || "error" in data) {
        const err = data as TranslateErrorResponse;
        setState((s) => ({
          ...s,
          loading: false,
          error: err.error ?? "Translation could not be completed.",
          errorCode: err.code ?? (res.status >= 500 ? "PROVIDER" : "VALIDATION"),
        }));
        return;
      }

      setState((s) => ({
        ...s,
        loading: false,
        output: (data as TranslateResponse).translatedText,
      }));
    } catch {
      setState((s) => ({
        ...s,
        loading: false,
        error: "Network error. Check your connection and try again.",
        errorCode: "PROVIDER",
      }));
    }
  }, [state.input, state.sourceLang, state.targetLang]);

  return {
    ...state,
    setInput,
    swapLanguages,
    translateText,
    charCount: state.input.length,
    maxChars: MAX_TRANSLATE_CHARS,
  };
}
