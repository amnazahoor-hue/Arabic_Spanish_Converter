"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const belowFoldSection = (loader: () => Promise<{ default: ComponentType }>) =>
  dynamic(loader, { loading: () => null, ssr: false });

const Features = belowFoldSection(() =>
  import("@/components/sections/Features").then((mod) => ({ default: mod.Features })),
);

const HowItWorks = belowFoldSection(() =>
  import("@/components/sections/HowItWorks").then((mod) => ({ default: mod.HowItWorks })),
);

const CommonPhrases = belowFoldSection(() =>
  import("@/components/sections/CommonPhrases").then((mod) => ({ default: mod.CommonPhrases })),
);

const ArabicDialects = belowFoldSection(() =>
  import("@/components/sections/ArabicDialects").then((mod) => ({ default: mod.ArabicDialects })),
);

const AiTranslatorFeatures = belowFoldSection(() =>
  import("@/components/sections/AiTranslatorFeatures").then((mod) => ({
    default: mod.AiTranslatorFeatures,
  })),
);

const Faq = belowFoldSection(() =>
  import("@/components/sections/Faq").then((mod) => ({ default: mod.Faq })),
);

export function HomeBelowFoldSections() {
  return (
    <>
      <Features />
      <HowItWorks />
      <CommonPhrases />
      <ArabicDialects />
      <AiTranslatorFeatures />
      <Faq />
    </>
  );
}
