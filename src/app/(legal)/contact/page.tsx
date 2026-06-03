import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  
  title: "Contact",
  description:
    "Contact Al-Andalus Translate: technical support, general inquiries, partnerships, and privacy questions.",
  path: "/contact",
});

const introSections = [
  {
    heading: "Get in touch",
    paragraphs: [
      "Thank you for visiting Al-Andalus Translate. If you have questions about the Arabic–Spanish translator, found a translation error, or want to collaborate, this is the right channel. We read every message carefully because behind each one are families, businesses, and students who depend on clear communication across languages.",
      "Before writing, check the FAQ on the homepage — it covers common topics like pricing (free), bidirectional use, mobile support, and automatic translation limits. If your case needs personal attention, use the form below with as much detail as possible so we can respond faster.",
    ],
  },
  {
    heading: "Technical support",
    paragraphs: [
      "If the translator does not load, shows a persistent error, or Arabic RTL does not display correctly on your device, tell us your browser, operating system, and a screenshot if possible. For network issues, check your connection and retry; 502 errors are often temporary limits from the translation provider.",
    ],
  },
  {
    heading: "General inquiries",
    paragraphs: [
      "We welcome questions about how to use the tool, improvement ideas, and educational content proposals for migrant communities in Spain and Latin America. Feedback in English, Spanish, or Arabic is welcome.",
    ],
  },
  {
    heading: "Business and partnerships",
    paragraphs: [
      "NGOs, media, language schools, and companies with ties to the Arab world may propose content partnerships or responsible integrations. We do not sell user data; any collaboration must respect our privacy policy and translation API terms.",
    ],
  },
  {
    heading: "Content or accuracy",
    paragraphs: [
      "If you find an offensive, incorrect, or risky translation in sensitive contexts (health, legal, minors), send the original text, languages selected, and the result. Machine translation is not a substitute for sworn professionals; your report helps us improve notices and safeguards.",
    ],
  },
  {
    heading: "Privacy",
    paragraphs: [
      "To exercise GDPR rights (access, rectification, erasure, objection), email from the address you used to contact us and describe your request. We respond without asking for more data than necessary. See the privacy policy for cookies and analytics details.",
    ],
  },
  {
    heading: "Response time",
    paragraphs: [
      "We aim to reply within 1–2 business days. Messages sent on weekends or public holidays are handled on the next business day. Thank you for trusting Al-Andalus Translate as a linguistic bridge between Arabic and Spanish.",
    ],
  },
] as const;

export default function ContactPage() {
  return (
    <article className="bg-bg py-16 md:py-20">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          articleSchema({
            title: "Contact",
            description: "Contact form and channels for Al-Andalus Translate.",
            path: "/contact",
          }),
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <header className="mb-10">
          <h1 className="type-h1-hero mb-4">Contact</h1>
          <p className="type-small">Last updated: {SITE_CONFIG.lastUpdated}</p>
        </header>

        <div className="space-y-8 mb-12">
          {introSections.map((s) => (
            <section key={s.heading}>
              <h2 className="type-h2-section mb-3">{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="type-body mb-3">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <ContactForm />
      </div>
    </article>
  );
}
