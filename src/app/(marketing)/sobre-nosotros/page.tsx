import { LegalPage } from "@/components/legal/LegalPage";
import { ABOUT_SECTIONS } from "@/content/legal/about";
import { SITE_ROUTES } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Sobre nosotros",
  description:
    "Quiénes somos, a quién servimos y por qué confiar en Traductor Árabe Español — traductor árabe–español para España, América Latina y más allá.",
  path: SITE_ROUTES.about,
  index: true,
});

export default function AboutPage() {
  return (
    <LegalPage
      title="Sobre nosotros"
      description="Traductor Árabe Español conecta a las comunidades de habla árabe y española con una traducción clara y accesible."
      path={SITE_ROUTES.about}
      docLabel="Información institucional"
      pageSchemaType="AboutPage"
      sections={ABOUT_SECTIONS}
      showToc
    />
  );
}
