import type { LegalSection } from "@/components/legal/LegalPage";

export const ABOUT_SECTIONS: LegalSection[] = [
  {
    heading: "Who we are",
    paragraphs: [
      "Al-Andalus Translate is an independent editorial and technology project dedicated to free Arabic–Spanish translation on the web. It grew from the belief that language should not be a barrier to booking a medical appointment, reading a school notice about your children, understanding a rental contract, or replying to a family WhatsApp message across the Mediterranean.",
      "We are not a translation agency or a law firm. We are a small team with experience in web development, applied linguistics, and intercultural communication, maintaining the service with transparency about its limits: machine translation useful for daily life, but not a substitute for sworn professionals where the law requires them.",
      "The name evokes Al-Andalus as a historical space of coexistence and exchange of knowledge between Arabic and Romance cultures; today that heritage becomes digital tools accessible from a phone, without paywalls or mandatory registration for basic translation. Last updated: May 2026.",
    ],
  },
  {
    heading: "Who we serve",
    paragraphs: [
      "Our primary audience is people and families from migrant and diaspora communities in Spain: Moroccans, Algerians, Tunisians, Syrians, Palestinians, Sahrawis, and other Arabic-speaking groups who live with Spanish in public administration, healthcare, work, and school. We also serve Latin Americans studying Arabic, Erasmus students, NGO volunteers, small businesses serving bilingual customers, and English-speaking users who need a clear bridge between Arabic and Spanish.",
      "In Latin America, interest in Arabic is growing for academic, family, professional (trade, diplomacy, tourism), and community reasons. We offer an immediate Spanish↔Arabic bridge without heavy app installs, useful on modest connections and mid-range phones common among our users.",
      "We recognize that many users alternate dialects (darija, Levantine Arabic) with Modern Standard Arabic. We explain honestly where the system performs best and when to seek a native speaker or specialized service, rather than promising universal perfection.",
    ],
  },
  {
    heading: "Experience, expertise, authority, and trust (E-E-A-T)",
    paragraphs: [
      "Search engines value demonstrated experience, topical authority, and trustworthiness (E-E-A-T). For us, \"experience\" shows in product decisions tested with real users: RTL support for Arabic, large touch targets, clear character limits, and visible warnings before using a translation in an official procedure.",
      "We do not claim authority in immigration law or medicine, but in the niche of computer-assisted Arabic–Spanish translation: clear documentation, FAQs that answer concrete questions (darija, sworn translators, mobile use), and legal pages in English aligned with GDPR and Spanish law.",
      "\"Trustworthiness\" comes from publishing complete legal notices, a detailed privacy policy, a visible update date (May 2026), and a contact channel. We do not hide that we use cloud translation APIs or that advertising may fund the free service.",
    ],
  },
  {
    heading: "Methodology and translation quality",
    paragraphs: [
      "The Site architecture separates the interface (Next.js, accessible and fast) from translation logic, which relies on a provider specialized in language pairs. Each request sends source text, detected or chosen source language, and target language; the response appears in the correct panel with proper writing direction (RTL/LTR).",
      "Before publishing changes, we test frequent phrases in real contexts: hospital messages, school notices, basic workplace queries, and family greetings. We compare Arabic→Spanish and Spanish→Arabic output to detect meaning reversals or loss of courtesy (tú/usted, common religious formulae).",
      "We apply anti-abuse limits so bots do not degrade the service for people who need it to communicate. Community-reported errors are prioritized in FAQ updates and, where appropriate, in adjustments to provider instructions or text preprocessing (normalization of numbers, dates, and Arabic punctuation).",
      "We always recommend the workflow \"automatic draft + human review\" for documents with consequences: visas, lawsuits, clinical reports, or employment contracts. That recommendation is part of our ethical methodology, not an empty disclaimer.",
    ],
  },
  {
    heading: "How we sustain the project",
    paragraphs: [
      "Free access is supported by responsible advertising and, eventually, affiliate links to Arabic or Spanish study materials, always disclosed when a commercial relationship exists. We do not sell translation content or user profiles.",
      "Roadmap improvements (better dialect support, community glossaries, slow-reading mode for learners) will be announced on this page and in a news section when available. Constructive feedback via /contact is welcome, especially if you notice systematically wrong translations in a specific domain (for example electrical or agricultural terms).",
    ],
  },
  {
    heading: "Commitment to the community",
    paragraphs: [
      "We believe an honest web translator should educate while it translates: that is why we link to resources on language integration, clarify the difference between MSA and darija, and remind users of basic privacy rights when pasting personal text into any online service.",
      "If you represent a neighborhood association, mosque, school, or union and need collective materials, you may propose non-commercial collaborations (digital literacy workshops, review of microcopy in plain Spanish) through the contact form.",
      "Al-Andalus Translate will remain, above all, a meeting place between Arabic and Spanish words: useful, limited when it must be, and transparent in everything else—for communities in Spain, Latin America, and beyond, in Arabic, Spanish, and English.",
    ],
  },
];
