import { LegalPage } from "@/components/legal/LegalPage";
import { ABOUT_SECTIONS } from "@/content/legal/about";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Who we are, who we serve, and why to trust Al-Andalus Translate — Arabic–Spanish translator for Spain, Latin America, and beyond.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <LegalPage
      title="About us"
      description="Al-Andalus Translate connects Arabic- and Spanish-speaking communities with clear, accessible translation."
      path="/about"
      sections={ABOUT_SECTIONS}
    />
  );
}
