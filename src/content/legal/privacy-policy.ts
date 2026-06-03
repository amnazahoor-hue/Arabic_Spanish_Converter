import type { LegalSection } from "@/components/legal/LegalPage";

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: "Introduction",
    paragraphs: [
      "At Al-Andalus Translate we respect your privacy and are committed to processing personal data in accordance with Regulation (EU) 2016/679 (GDPR), Organic Law 3/2018 on the Protection of Personal Data and guarantee of digital rights (LOPDGDD), and other applicable Spanish law.",
      "This Privacy Policy explains what information we collect when you visit our Arabic–Spanish translator, how we use it, with which third parties it may be shared (for example analytics or advertising providers), and what rights you may exercise as a data subject, with particular attention to users resident in Spain and the European Union. Arabic-speaking communities in Spain and Latin America, as well as English-speaking users, should read this policy before using the service. Last updated: May 2026.",
      "The data controller is the Site owner identified on the Contact page. If you have questions after reading this document, contact us before providing sensitive data or using the contact form with detailed information about your immigration or health situation.",
    ],
  },
  {
    heading: "Information we collect",
    paragraphs: [
      "Data you provide voluntarily: when you use the contact form, you may send your name, email address, subject, and message. We do not require registration to translate text in the main box; by default we do not associate the content of your translations with a user account or store a permanent history linked to your identity on the application server, except for brief technical logs described below.",
      "Technical and usage data: when you access the Site, our systems and providers may record truncated or pseudonymized IP address, browser type, operating system, browser language, pages visited, time on site, interaction events (for example copy-button clicks or translation direction changes), and campaign references (UTM) if you arrive from an external link.",
      "Cookies and similar technologies: we use cookies necessary for operation and, where the law requires your consent, analytics and advertising cookies. You can manage preferences from the banner or your browser settings, as detailed in the corresponding section.",
      "We do not actively request special categories of data (ethnic origin, political opinions, health data, etc.) to use the translator. If you enter such content in the text box, it is processed only to return the requested translation. Do not use the service for critical clinical or immigration information without appropriate safeguards; we recommend not pasting data you do not want to transit through third-party infrastructure (cloud translation provider).",
    ],
  },
  {
    heading: "How we use your information",
    paragraphs: [
      "Service delivery: we process text you send to the translation API solely to generate output in the target language and display it on screen. We apply length limits and anti-abuse measures to protect system stability.",
      "Communication: contact form data is used to answer your inquiry, handle technical incidents, rights requests, or reports of unlawful content in external links.",
      "Improvement and security: aggregated analytics help us understand which sections are most useful (translator, FAQ, legal pages), detect interface errors on mobile devices common among our audience, and prevent malicious automation (mass scraping, denial-of-service attacks).",
      "Advertising: if you accept advertising cookies, partners may show contextual or personalized ads under their policies. We do not sell your email list or the content of your translations to data brokers.",
      "Legal basis: performance of pre-contractual measures and the Site use contract (Art. 6(1)(b) GDPR), legitimate interest in security and service improvement (Art. 6(1)(f)), and consent for non-essential cookies and commercial communications where applicable (Art. 6(1)(a)).",
    ],
  },
  {
    heading: "Cookies",
    paragraphs: [
      "Cookies are small files your browser stores on your device. We classify them as: (i) technical or strictly necessary, essential to load the Site, remember interface language preferences, or maintain session security; (ii) preference cookies that remember options such as cookie-banner acceptance; (iii) analytics cookies that measure audience in aggregate; and (iv) advertising cookies that ad networks may use to limit ad repetition or measure conversions.",
      "On first access from the EU, we show an informative banner allowing you to accept all categories, reject non-essential ones, or configure them granularly, in line with guidance from the Spanish Data Protection Agency (AEPD) and GDPR transparency requirements.",
      "You may delete or block cookies in Chrome, Firefox, Safari, Edge, or other browsers. Note that blocking technical cookies may prevent correct use of the translator or contact form.",
    ],
  },
  {
    heading: "Google Analytics and Microsoft Clarity",
    paragraphs: [
      "We may use Google Analytics 4 (Google Ireland Limited or the entity configured) to obtain statistics on visits, page views, devices, and custom events (for example use of the language-swap button). Google may transfer data to servers outside the EEA with appropriate safeguards (standard contractual clauses, adequacy decisions, or supplementary measures as applicable).",
      "Microsoft Clarity provides heat maps and anonymized session recordings that help detect usability issues on small screens, highly relevant for users accessing from smartphones in Spain or Latin America. Clarity masks sensitive fields by default, but we still advise against entering personal data in the translation box when possible.",
      "Both tools may place cookies or use similar identifiers only if you have given the corresponding consent. You may revoke it at any time via our cookie panel or by clearing browser storage. For more information, see Google and Microsoft privacy policies and their official opt-out options.",
    ],
  },
  {
    heading: "Data retention",
    paragraphs: [
      "Contact messages are kept as long as needed to handle your request and for limitation periods for possible claims (typically up to five years in contractual matters, unless a different legal obligation applies).",
      "Server logs and security records are rotated or deleted within short periods (for example between thirty and ninety days), unless they must be retained for an abuse investigation.",
      "Data processed by Google Analytics and Clarity is retained according to each tool's configuration (for example fourteen months in GA4 if so set). We periodically review those periods to align with the storage limitation principle in Article 5(1)(e) GDPR.",
      "Text sent for translation is not stored for commercial profiling. Any temporary retention in memory or processing queues is strictly operational.",
    ],
  },
  {
    heading: "Your rights (GDPR and Spain)",
    paragraphs: [
      "As a data subject, you may exercise against the controller the rights of access, rectification, erasure, objection, restriction of processing, portability (where processing is based on consent or contract and is automated), and not to be subject to decisions based solely on automated processing, including profiling with similar legal effects, under the GDPR.",
      "Where processing is based on consent, you may withdraw it at any time without affecting the lawfulness of prior processing. For cookies, withdrawal is effected through the configuration tool or browser cleanup.",
      "You have the right to lodge a complaint with the Spanish Data Protection Agency (www.aepd.es), the supervisory authority in Spain, if you believe processing violates the rules. Before contacting the authority, you may write to us so we can try to resolve your concern in good faith.",
      "We will respond to rights requests within one month, extendable by two further months in complex cases, with reasonable identification of the requester to prevent unauthorized access to third-party data.",
    ],
  },
  {
    heading: "Data security",
    paragraphs: [
      "We apply technical and organizational measures appropriate to the risk: encrypted transmission via HTTPS, restricted administrative access, dependency updates, monitoring of abuse attempts on the translation API, and selection of providers that offer confidentiality commitments and, where applicable, data processing agreements under Article 28 GDPR.",
      "No internet system is completely invulnerable. If a security breach poses a high risk to your rights, we will notify you and, where required, the AEPD within seventy-two hours of becoming aware, under Article 33 GDPR.",
      "We recommend not sharing third-party passwords in the translator, using updated devices, and logging out on shared equipment if we later offer authenticated features.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "We will update this Policy when we add new measurement tools, change translation provider, modify the contact form, or respond to legal requirements (for example the Digital Services Regulation). The current version will be published at /privacy-policy with the date in the header (May 2026).",
      "If changes are substantial and affect consent previously given, we will ask for your cookie choice again or inform you through visible means on the Site.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "To exercise data protection rights, request information about processors (hosting, translation, transactional email, analytics), or for any question about this Policy, use the form at /contact with the subject \"Privacy\" or \"Data protection\".",
      "Include enough information to identify your request without exposing more sensitive data than necessary. We will respond in English or Spanish as appropriate; you may use our translator as orientational support for Arabic or English legal terms, understanding that it does not constitute legal advice.",
    ],
  },
];
