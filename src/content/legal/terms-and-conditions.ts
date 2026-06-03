import type { LegalSection } from "@/components/legal/LegalPage";

export const TERMS_SECTIONS: LegalSection[] = [
  {
    heading: "Acceptance of terms",
    paragraphs: [
      "These Terms and Conditions (hereinafter, \"the Terms\") govern access to and use of the Al-Andalus Translate website and its bidirectional Arabic–Spanish translation tool. By using the Site, you agree to be bound by these Terms, the Legal Notice, the Privacy Policy, and any specific rules published on particular pages. Last updated: May 2026.",
      "If you act on behalf of a company, association, or public body, you represent that you have authority to bind that entity. If you are a minor under Spanish law, you must use the Site under parental or guardian supervision, who assume responsibility for use.",
      "We may deny or suspend access to users who breach these Terms, engage in abusive automated use, or attempt to compromise service security, without an obligation to compensate for that suspension when there is justified cause.",
    ],
  },
  {
    heading: "Use of the website",
    paragraphs: [
      "We grant you a limited, non-exclusive, revocable, non-transferable license to access the Site and use the translator for personal, educational, family, or moderate internal professional purposes, provided they do not violate the law or these Terms.",
      "You may not use the Site to disseminate illegal, defamatory, hate-inciting content, content that infringes intellectual property, malware, or harassment toward persons or groups. Impersonation, harvesting other users' data (if social features are added in the future), or interference with normal service operation is also prohibited.",
      "You are responsible for the text you enter and for the consequences of sharing translations obtained. The Site is aimed primarily at facilitating communication for bilingual communities or learners in Spain, Latin America, and Arabic-speaking countries, without replacing official integration or interpretation services.",
    ],
  },
  {
    heading: "Intellectual property",
    paragraphs: [
      "The design, the Al-Andalus Translate brand, original page texts, proprietary source code structure, icons, and content selection are owned by the Site owner or licensors and are protected by Spanish and international intellectual and industrial property law.",
      "Systematic reproduction, public distribution, transformation, or commercial exploitation of those elements is not permitted without prior written authorization, except as allowed by law (brief quotations with source attribution, ordinary links, etc.).",
      "Text you enter for translation remains yours or that of whoever granted you rights. By submitting it, you grant us a temporary, limited license to process it solely to provide the translation service, without transferring your copyright in original works.",
      "Automatically generated translations may not be protected as human creative works in some jurisdictions; in any case, we do not guarantee absence of overlap with third-party texts in external providers' training corpora.",
    ],
  },
  {
    heading: "Conditions for use of the tool",
    paragraphs: [
      "The translator is offered with per-request character limits and rate limiting to ensure fair use. Circumventing those limits via scripts, rotating proxies, bot farms, or artificial splitting of text in coordinated bursts is prohibited.",
      "Mass scraping of translator output to build databases, train competing models without authorization, reselling the service as an unauthorized API, or automated commercial monitoring of the Site without consent is expressly forbidden.",
      "You may not reverse engineer, decompile, or attempt to extract underlying translation model code through the Site. Access to the internal API (/api/translate) is restricted to legitimate use from the web interface or integrations expressly authorized in writing.",
      "You must not enter content that infringes third-party trade secrets, personal data of others without a legal basis, or information subject to professional confidentiality. For enterprise or government volumes, contact us to evaluate specific terms.",
    ],
  },
  {
    heading: "Disclaimer of warranties",
    paragraphs: [
      "The Site and translations are provided \"as is\" and \"as available.\" To the maximum extent permitted by law, we disclaim express or implied warranties of linguistic accuracy, uninterrupted availability, error-free operation, fitness for official procedures, or compatibility with all devices and browsers.",
      "We do not warrant that translations are equivalent to those of a sworn translator, conference interpreter, or licensed professional. Religious, cultural, medical, or legal nuances may be lost or distorted.",
      "Supplementary Site information (FAQ, guides) may become outdated; always verify administrative requirements with official sources.",
    ],
  },
  {
    heading: "Limitation of liability",
    paragraphs: [
      "In no event shall the Site owner, its contributors, or technology providers be liable for indirect damages, lost profits, lost opportunities, reputational harm, or consequences of decisions taken solely on the basis of machine translation, unless mandatory Spanish or European law provides otherwise (for example fraud or personal injury from gross negligence directly attributable to the owner).",
      "The owner's total aggregate liability to a user for Site-related claims in any twelve-month period shall be limited, where legally valid, to amounts you paid for specific paid services to the Site in that period, or one hundred euros (€100) if use was free, subject to mandatory rules.",
      "Some jurisdictions do not allow certain limitations; in that case only those valid in your territory apply without affecting the remaining clauses.",
    ],
  },
  {
    heading: "Third-party links",
    paragraphs: [
      "The Site may contain links to external resources (institutions, dictionaries, news, advertising partners). We do not control those sites or assume responsibility for their content, policies, or practices. Access is at your own risk and governed by the third party's terms.",
      "A link does not imply sponsorship or professional recommendation unless expressly stated in editorial context.",
    ],
  },
  {
    heading: "Modifications",
    paragraphs: [
      "We reserve the right to modify these Terms, translator features, usage limits, or monetization models (advertising, donations, future paid plans) by publishing the updated version at /terms-and-conditions.",
      "If changes are material, we will provide a visible notice on the Site. Continued use after the new version takes effect implies acceptance, without prejudice to your consumer rights where applicable user-protection law applies.",
    ],
  },
  {
    heading: "Governing law and jurisdiction",
    paragraphs: [
      "These Terms are governed by Spanish law. For dispute resolution, the parties submit to the courts of the consumer's domicile where EU consumer law so provides; otherwise to the courts of Spain that apply under general procedural rules, without prejudice to mandatory mediation or arbitration mechanisms imposed by law.",
      "If you reside outside the EU, mandatory consumer-protection rules of your country of residence may apply.",
    ],
  },
  {
    heading: "Severability",
    paragraphs: [
      "If any clause of these Terms is declared void or unenforceable by a competent authority, the remainder stays in force. The affected clause will be interpreted or replaced by a valid clause that approximates the original intent as closely as permitted by law.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "For questions about these Terms, enterprise API use requests, or abuse reports, use /contact with the subject \"Terms and conditions.\" We will aim to respond within a reasonable time in English or Spanish.",
      "Before starting court proceedings, we invite you to contact us in good faith to seek an amicable solution, especially in disputes about access restrictions due to improper automated use.",
    ],
  },
];
