"use client";

import { isSpeechSynthesisSupported } from "@/lib/speech";
import { useCallback, useEffect, useState } from "react";

export function useSpeechSynthesis(lang: string) {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(isSpeechSynthesisSupported());
    return () => {
      if (typeof window !== "undefined") window.speechSynthesis.cancel();
    };
  }, []);

  const stop = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!supported || !text.trim() || typeof window === "undefined") return;

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    },
    [lang, supported],
  );

  const toggle = useCallback(
    (text: string) => {
      if (speaking) stop();
      else speak(text);
    },
    [speaking, speak, stop],
  );

  return { speaking, supported, speak, stop, toggle };
}
