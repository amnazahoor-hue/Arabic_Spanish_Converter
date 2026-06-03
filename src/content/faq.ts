export type FaqCategory = "Pricing" | "Languages" | "Privacy" | "Quality" | "Devices";

export const FAQ_ITEMS = [
  {
    id: "free",
    category: "Pricing" as FaqCategory,
    question: "Is the Arabic–Spanish translator free?",
    answer:
      "Yes. Al-Andalus Translate is free for personal and everyday use. You do not need an account or payment details to translate phrases, messages, or drafts. We fund the service with responsible advertising and reasonable usage limits to keep quality stable.",
  },
  {
    id: "bidirectional",
    category: "Languages" as FaqCategory,
    question: "Does it work both ways (Arabic→Spanish and Spanish→Arabic)?",
    answer:
      "Absolutely. Choose Arabic as the source and Spanish as the target, or the reverse, using the swap button. The UI sets RTL for Arabic panels and LTR for Spanish so reading and copying results is comfortable on any device.",
  },
  {
    id: "darija",
    category: "Languages" as FaqCategory,
    question: "Does it support Darija / Moroccan Arabic?",
    answer:
      "The engine is tuned for Modern Standard Arabic (MSA) and general Spanish. Darija, Moroccan Arabic, and other dialects may be translated approximately, but accuracy varies. For legal or medical documents, always consult a qualified human professional.",
  },
  {
    id: "account",
    category: "Privacy" as FaqCategory,
    question: "Do I need to create an account?",
    answer:
      "No. You can translate immediately in your browser. We do not store translation history tied to your identity unless you contact us voluntarily through the form. That keeps access fast for families and workers who need to communicate without barriers.",
  },
  {
    id: "accuracy",
    category: "Quality" as FaqCategory,
    question: "How accurate is it for important documents?",
    answer:
      "Machine translation helps with messages, social posts, and drafts, but it is not a substitute for a sworn translator or official interpreter. Cultural nuance, technical terms, or legal context can be wrong. For contracts, visas, or official procedures, use certified human review.",
  },
  {
    id: "mobile",
    category: "Devices" as FaqCategory,
    question: "Does it work on mobile?",
    answer:
      "Yes. The interface is built for screens from 320px wide with no horizontal scrolling. Buttons are touch-friendly, the menu uses a hamburger pattern on small screens, and text areas respect RTL when you write or read Arabic on your phone.",
  },
] as const;
