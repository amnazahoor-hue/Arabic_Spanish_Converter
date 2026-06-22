import { MarroquiLanding } from "@/components/sections/marroqui/MarroquiLanding";
import { JsonLd } from "@/components/seo/JsonLd";
import { marroquiPageSchemas } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { MARROQUI_PAGE_PATH } from "@/content/marroqui-page";

export const metadata = buildMetadata({
  title: "Directo traductor marroquí español",
  description:
    "Obtenga una traducción precisa de nuestro traductor marroquí español. Le ayuda a conectar y a comunicarte eficazmente.",
  path: MARROQUI_PAGE_PATH,
});

export default function TraductorMarroquiEspanolPage() {
  return (
    <>
      <JsonLd data={marroquiPageSchemas()} />
      <MarroquiLanding />
    </>
  );
}
