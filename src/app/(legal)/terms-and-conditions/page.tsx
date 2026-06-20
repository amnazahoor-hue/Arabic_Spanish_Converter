import { LegalPage } from "@/components/legal/LegalPage";
import { TERMS_SECTIONS } from "@/content/legal/terms-and-conditions";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Términos Y Condiciones",
  description:
    "Condiciones de uso de Traductor Árabe Español y la herramienta de traducción árabe–español. Propiedad intelectual y normas de uso.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Términos Y Condiciones"
      description="Normas de uso del sitio web y la herramienta de traducción de Traductor Árabe Español."
      path="/terms-and-conditions"
      sections={TERMS_SECTIONS}
    />
  );
}
