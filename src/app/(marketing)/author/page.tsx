import { AuthorPageContent } from "@/components/legal/AuthorPageContent";
import { AUTHOR_PROFILE } from "@/content/legal/author";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: `${AUTHOR_PROFILE.name} — Author | Traductor Árabe Español`,
  description: `Conoce a ${AUTHOR_PROFILE.name}, experta en traducción árabe-español en Traductor Árabe Español.`,
  path: "/author",
});

export default function AuthorPage() {
  return <AuthorPageContent />;
}
