"use client";

import { VoiceInputButton } from "@/components/translator/VoiceInputButton";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import type { LanguageCode } from "@/lib/constants";
import { SPEECH_LANG } from "@/lib/speech";
import { useCallback, useEffect, useRef } from "react";

export type TranslatorVoiceInputState = {
  listening: boolean;
  error: string | null;
  supported: boolean;
};

type TranslatorVoiceInputActionProps = {
  sourceLang: LanguageCode;
  input: string;
  loading: boolean;
  resetKey?: number;
  onPreview: (text: string) => void;
  onFinal: (text: string) => void;
  onStateChange: (state: TranslatorVoiceInputState) => void;
};

export function TranslatorVoiceInputAction({
  sourceLang,
  input,
  loading,
  resetKey = 0,
  onPreview,
  onFinal,
  onStateChange,
}: TranslatorVoiceInputActionProps) {
  const voiceInput = useSpeechRecognition(SPEECH_LANG[sourceLang]);
  const baseInputRef = useRef("");
  const inputRef = useRef(input);
  inputRef.current = input;

  useEffect(() => {
    onStateChange({
      listening: voiceInput.listening,
      error: voiceInput.error,
      supported: voiceInput.supported,
    });
  }, [voiceInput.listening, voiceInput.error, voiceInput.supported, onStateChange]);

  useEffect(() => {
    voiceInput.stop();
    voiceInput.clearError();
  }, [sourceLang]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    voiceInput.stop();
    voiceInput.clearError();
    baseInputRef.current = "";
  }, [resetKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleVoiceResult = useCallback(
    (transcript: string, isFinal: boolean) => {
      if (isFinal) {
        const combined = baseInputRef.current.trim()
          ? `${baseInputRef.current.trim()} ${transcript}`
          : transcript;
        onFinal(combined);
        baseInputRef.current = "";
        return;
      }

      const preview = baseInputRef.current.trim()
        ? `${baseInputRef.current.trim()} ${transcript}`
        : transcript;
      onPreview(preview);
    },
    [onFinal, onPreview],
  );

  const onVoiceClick = useCallback(() => {
    voiceInput.clearError();
    if (!voiceInput.listening) {
      baseInputRef.current = inputRef.current;
    }
    voiceInput.toggle(handleVoiceResult);
  }, [voiceInput, handleVoiceResult]);

  if (!voiceInput.supported) return null;

  return (
    <VoiceInputButton
      listening={voiceInput.listening}
      supported={voiceInput.supported}
      disabled={loading}
      onClick={onVoiceClick}
    />
  );
}
