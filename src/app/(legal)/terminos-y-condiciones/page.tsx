import { LegalPage } from "@/components/legal/LegalPage";
import { TERMS_SECTIONS } from "@/content/legal/terms-and-conditions";
import { SITE_ROUTES } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Términos y condiciones",
  description:
    "Condiciones de uso de Traductor Árabe Español y la herramienta de traducción árabe–español. Propiedad intelectual y normas de uso.",
  path: SITE_ROUTES.terms,
  noIndex: true,
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Términos y condiciones"
      description="Normas de uso del sitio web y la herramienta de traducción de Traductor Árabe Español."
      path={SITE_ROUTES.terms}
      sections={TERMS_SECTIONS}
      showToc
    />
  );
}
