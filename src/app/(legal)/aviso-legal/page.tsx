import { LegalPage } from "@/components/legal/LegalPage";
import { DISCLAIMER_SECTIONS } from "@/content/legal/disclaimer";
import { SITE_ROUTES } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Aviso legal",
  description:
    "Aviso legal y limitaciones de la traducción automática del traductor árabe–español Traductor Árabe Español.",
  path: SITE_ROUTES.disclaimer,
  noIndex: true,
});

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Aviso legal"
      description="Información jurídica sobre el uso del traductor árabe–español y los límites de la traducción automática."
      path={SITE_ROUTES.disclaimer}
      sections={DISCLAIMER_SECTIONS}
      showToc
    />
  );
}
