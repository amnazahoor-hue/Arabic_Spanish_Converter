"use client";

import { getSpeechRecognitionCtor, isSpeechRecognitionSupported } from "@/lib/speech";
import { useCallback, useEffect, useRef, useState } from "react";

type OnResult = (transcript: string, isFinal: boolean) => void;

export function useSpeechRecognition(lang: string) {
  const [listening, setListening] = useState(false);
  const [supported, setSupported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const onResultRef = useRef<OnResult | null>(null);

  useEffect(() => {
    setSupported(isSpeechRecognitionSupported());
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  const start = useCallback(
    (onResult: OnResult) => {
      const SpeechRecognitionCtor = getSpeechRecognitionCtor();
      if (!SpeechRecognitionCtor) {
        setError("Tu navegador no admite reconocimiento de voz.");
        return;
      }

      onResultRef.current = onResult;
      setError(null);
      recognitionRef.current?.abort();

      const recognition = new SpeechRecognitionCtor();
      recognition.lang = lang;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setListening(true);
      recognition.onend = () => setListening(false);
      recognition.onerror = (event) => {
        setListening(false);
        if (event.error === "not-allowed") {
          setError("Permiso de micrófono denegado. Actívalo en la configuración del navegador.");
        } else if (event.error === "no-speech") {
          setError("No se detectó voz. Inténtalo de nuevo.");
        } else if (event.error !== "aborted") {
          setError("No se pudo captar la voz. Inténtalo de nuevo.");
        }
      };
      recognition.onresult = (event) => {
        let interim = "";
        let final = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i]?.[0]?.transcript ?? "";
          if (event.results[i]?.isFinal) final += transcript;
          else interim += transcript;
        }
        if (final) onResultRef.current?.(final.trim(), true);
        else if (interim) onResultRef.current?.(interim.trim(), false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    },
    [lang],
  );

  const toggle = useCallback(
    (onResult: OnResult) => {
      if (listening) stop();
      else start(onResult);
    },
    [listening, start, stop],
  );

  const clearError = useCallback(() => setError(null), []);

  return { listening, supported, error, start, stop, toggle, clearError };
}
