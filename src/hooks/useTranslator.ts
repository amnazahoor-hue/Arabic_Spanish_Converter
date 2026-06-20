"use client";

import {
  defaultArabicFor,
  MAX_TRANSLATE_CHARS,
  type LanguageCode,
} from "@/lib/constants";
import type { TranslateErrorResponse, TranslateResponse } from "@/types";
import { useCallback, useMemo, useState } from "react";

type TranslatorState = {
  sourceLang: LanguageCode;
  targetLang: LanguageCode;
  input: string;
  output: string;
  loading: boolean;
  error: string | null;
  errorCode: TranslateErrorResponse["code"] | null;
};

function defaultTargetFor(initialFrom: LanguageCode): LanguageCode {
  return initialFrom === "es" ? defaultArabicFor(initialFrom) : "es";
}

export function useTranslator(initialFrom: LanguageCode = "ar") {
  const defaultSource = initialFrom;
  const defaultTarget = defaultTargetFor(initialFrom);

  const [state, setState] = useState<TranslatorState>({
    sourceLang: defaultSource,
    targetLang: defaultTarget,
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

  const translateFromText = useCallback(
    async (rawText: string) => {
      const trimmed = rawText.trim();
      if (!trimmed) {
        setState((s) => ({
          ...s,
          error: "Escribe o pega algún texto antes de traducir.",
          errorCode: "EMPTY_INPUT",
        }));
        return;
      }

      const input = trimmed.slice(0, MAX_TRANSLATE_CHARS);
      setState((s) => ({
        ...s,
        input,
        loading: true,
        error: null,
        errorCode: null,
      }));

      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: input,
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
            error: err.error ?? "No se pudo completar la traducción.",
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
          error: "Error de red. Comprueba tu conexión e inténtalo de nuevo.",
          errorCode: "PROVIDER",
        }));
      }
    },
    [state.sourceLang, state.targetLang],
  );

  const translateText = useCallback(async () => {
    await translateFromText(state.input);
  }, [state.input, translateFromText]);

  const reset = useCallback(() => {
    setState({
      sourceLang: defaultSource,
      targetLang: defaultTarget,
      input: "",
      output: "",
      loading: false,
      error: null,
      errorCode: null,
    });
  }, [defaultSource, defaultTarget]);

  const isDefault = useMemo(
    () =>
      state.input === "" &&
      state.output === "" &&
      !state.error &&
      state.sourceLang === defaultSource &&
      state.targetLang === defaultTarget,
    [state, defaultSource, defaultTarget],
  );

  return {
    ...state,
    setInput,
    swapLanguages,
    translateText,
    translateFromText,
    reset,
    isDefault,
    charCount: state.input.length,
    maxChars: MAX_TRANSLATE_CHARS,
  };
}
