import { MARROQUI_PAGE_DESCRIPTION, MARROQUI_PAGE_PATH, MARROQUI_PAGE_TITLE } from "@/content/marroqui-page";
import { MarroquiLanding } from "@/components/sections/marroqui/MarroquiLanding";
import { JsonLd } from "@/components/seo/JsonLd";
import { marroquiPageSchemas } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: MARROQUI_PAGE_TITLE,
  description: MARROQUI_PAGE_DESCRIPTION,
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
