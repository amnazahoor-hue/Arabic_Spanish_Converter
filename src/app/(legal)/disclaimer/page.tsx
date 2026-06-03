import { LegalPage } from "@/components/legal/LegalPage";
import { DISCLAIMER_SECTIONS } from "@/content/legal/disclaimer";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Disclaimer",
  description:
    "Legal disclaimer and machine-translation limitations for Al-Andalus Translate Arabic–Spanish translator.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      description="Legal information about using the Arabic–Spanish translator and the limits of automatic translation."
      path="/disclaimer"
      sections={DISCLAIMER_SECTIONS}
    />
  );
}
