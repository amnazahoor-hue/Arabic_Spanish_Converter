import { LegalPage } from "@/components/legal/LegalPage";
import { DISCLAIMER_SECTIONS } from "@/content/legal/disclaimer";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Aviso Legal",
  description:
    "Aviso legal y limitaciones de la traducción automática del traductor árabe–español Traductor Árabe Español.",
  path: "/disclaimer",
  noIndex: true,
});

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Aviso Legal"
      description="Información jurídica sobre el uso del traductor árabe–español y los límites de la traducción automática."
      path="/disclaimer"
      sections={DISCLAIMER_SECTIONS}
      showToc
    />
  );
}
