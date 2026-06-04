import { Clock3, Languages, PenLine, Share2, Sparkles, Zap, type LucideIcon } from "lucide-react";

export type HowItWorksStep = {
  number: number;
  title: string;
  description: string;
  hint?: string;
  Icon: LucideIcon;
};

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    number: 1,
    title: "Choose your languages",
    description:
      "Arabic → Spanish or Spanish → Arabic — swap direction anytime with one tap.",
    Icon: Languages,
  },
  {
    number: 2,
    title: "Type or paste your text",
    description: "Up to 5,000 characters per request in the input area.",
    hint: "Works on phone, tablet, and desktop",
    Icon: PenLine,
  },
  {
    number: 3,
    title: "Press translate",
    description: "Instant results in seconds with proper Arabic RTL layout.",
    hint: "Shortcut: Ctrl+Enter (⌘+Enter on Mac)",
    Icon: Zap,
  },
  {
    number: 4,
    title: "Share your translation",
    description: "Copy, WhatsApp, PDF export, or email — all from the result panel.",
    Icon: Share2,
  },
];

export const HOW_IT_WORKS_HIGHLIGHTS = [
  { label: "4 simple steps", Icon: Sparkles },
  { label: "Under a minute", Icon: Clock3 },
  { label: "100% free", Icon: Zap },
] as const;
