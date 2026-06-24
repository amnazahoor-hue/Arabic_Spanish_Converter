import { AuthorPageContent } from "@/components/legal/AuthorPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { AUTHOR_PROFILE } from "@/content/legal/author";
import { SITE_ROUTES } from "@/lib/routes";
import { authorPageSchemas } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${AUTHOR_PROFILE.name} — Autora | Traductor Árabe Español`,
  description: `Conoce a ${AUTHOR_PROFILE.name}, experta en traducción árabe-español, formación, especialidades y enfoque editorial en Traductor Árabe Español.`,
  path: SITE_ROUTES.author,
  noIndex: true,
});

export default function AuthorPage() {
  return (
    <>
      <JsonLd data={authorPageSchemas()} />
      <AuthorPageContent />
    </>
  );
}
