import { LegalPage } from "@/components/legal/LegalPage";
import { PRIVACY_SECTIONS } from "@/content/legal/privacy-policy";
import { SITE_ROUTES } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Política de privacidad",
  description:
    "Cómo Traductor Árabe Español recopila, utiliza y protege sus datos. Cookies, analítica y derechos GDPR.",
  path: SITE_ROUTES.privacy,
  noIndex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Política de privacidad"
      description="Transparencia sobre datos personales, cookies y analítica en nuestro traductor en línea."
      path={SITE_ROUTES.privacy}
      docLabel="Política de privacidad"
      sections={PRIVACY_SECTIONS}
      showToc
    />
  );
}
