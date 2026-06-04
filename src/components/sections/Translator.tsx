"use client";

import { TranslatorPanel } from "@/components/sections/TranslatorPanel";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS } from "@/lib/constants";

export function Translator() {
  return (
    <Section id={SECTION_IDS.translator} tone="sand">
      <TranslatorPanel />
    </Section>
  );
}
