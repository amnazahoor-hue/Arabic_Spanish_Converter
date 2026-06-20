import { MarroquiLanding } from "@/components/sections/marroqui/MarroquiLanding";
import { JsonLd } from "@/components/seo/JsonLd";
import { MARROQUI_FAQ_ITEMS, MARROQUI_PAGE_PATH } from "@/content/marroqui-page";
import { articleSchema, breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Directo traductor marroquí español",
  description:
    "Obtenga una traducción precisa de nuestro traductor marroquí español. Le ayuda a conectar y a comunicarte eficazmente.",
  path: MARROQUI_PAGE_PATH,
});

export default function TraductorMarroquiEspanolPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: MARROQUI_FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Inicio", path: "/" },
          { name: "Traductor Marroquí Español", path: MARROQUI_PAGE_PATH },
        ])}
      />
      <JsonLd
        data={articleSchema({
          title: "Directo traductor marroquí español",
          description:
            "Obtenga una traducción precisa de nuestro traductor marroquí español. Le ayuda a conectar y a comunicarte eficazmente.",
          path: MARROQUI_PAGE_PATH,
        })}
      />
      <JsonLd data={faqSchema} />
      <MarroquiLanding />
    </>
  );
}
