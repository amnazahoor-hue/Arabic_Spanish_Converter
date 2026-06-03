import { LegalPage } from "@/components/legal/LegalPage";
import { PRIVACY_SECTIONS } from "@/content/legal/privacy-policy";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Al-Andalus Translate collects, uses, and protects your data. Cookies, analytics, and GDPR rights.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="Transparency about personal data, cookies, and analytics on our online translator."
      path="/privacy-policy"
      sections={PRIVACY_SECTIONS}
    />
  );
}
