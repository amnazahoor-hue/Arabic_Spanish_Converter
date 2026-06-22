import { LegalPage } from "@/components/legal/LegalPage";
import { PRIVACY_SECTIONS } from "@/content/legal/privacy-policy";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Política De Privacidad",
  description:
    "Cómo Traductor Árabe Español recopila, utiliza y protege sus datos. Cookies, analítica y derechos GDPR.",
  path: "/privacy-policy",
  noIndex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Política De Privacidad"
      description="Transparencia sobre datos personales, cookies y analítica en nuestro traductor en línea."
      path="/privacy-policy"
      docLabel="Política de privacidad"
      sections={PRIVACY_SECTIONS}
      showToc
    />
  );
}
