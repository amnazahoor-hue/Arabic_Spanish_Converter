import { LegalPage } from "@/components/legal/LegalPage";
import { TERMS_SECTIONS } from "@/content/legal/terms-and-conditions";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description:
    "Terms of use for Al-Andalus Translate and the Arabic–Spanish translation tool. Intellectual property and usage rules.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      description="Rules for using the Al-Andalus Translate website and translation tool."
      path="/terms-and-conditions"
      sections={TERMS_SECTIONS}
    />
  );
}
