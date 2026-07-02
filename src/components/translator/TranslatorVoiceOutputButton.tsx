"use client";

import { VoiceOutputButton } from "@/components/translator/VoiceOutputButton";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import type { LanguageCode } from "@/lib/constants";
import { SPEECH_LANG } from "@/lib/speech";
import { useEffect } from "react";

type TranslatorVoiceOutputButtonProps = {
  targetLang: LanguageCode;
  output: string;
  loading: boolean;
  resetKey?: number;
};

export function TranslatorVoiceOutputButton({
  targetLang,
  output,
  loading,
  resetKey = 0,
}: TranslatorVoiceOutputButtonProps) {
  const voiceOutput = useSpeechSynthesis(SPEECH_LANG[targetLang]);

  useEffect(() => {
    voiceOutput.stop();
  }, [targetLang]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    voiceOutput.stop();
  }, [resetKey]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!voiceOutput.supported) return null;

  return (
    <VoiceOutputButton
      speaking={voiceOutput.speaking}
      supported={voiceOutput.supported}
      disabled={loading || !output.trim()}
      onClick={() => voiceOutput.toggle(output)}
    />
  );
}
