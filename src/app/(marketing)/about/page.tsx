import { LegalPage } from "@/components/legal/LegalPage";
import { ABOUT_SECTIONS } from "@/content/legal/about";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sobre Nosotros",
  description:
    "Quiénes somos, a quién servimos y por qué confiar en Traductor Árabe Español — traductor árabe–español para España, América Latina y más allá.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <LegalPage
      title="Sobre Nosotros"
      description="Traductor Árabe Español conecta a las comunidades de habla árabe y española con una traducción clara y accesible."
      path="/about"
      docLabel="Información institucional"
      sections={ABOUT_SECTIONS}
    />
  );
}
