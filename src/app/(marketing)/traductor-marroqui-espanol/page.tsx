import { TranslatorPanel } from "@/components/sections/TranslatorPanel";
import { Section } from "@/components/ui/Section";
import { PAGE_CONTAINER_CLASS, SECTION_IDS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Traductor Marroquí Español: Darija A Español Gratis",
  description:
    "Traduce darija marroquí al español al instante. Nuestro traductor marroquí español comprende el árabe de Marruecos y ofrece traducciones naturales y fiables.",
  path: "/traductor-marroqui-espanol",
});

export default function TraductorMarroquiEspanolPage() {
  return (
    <>
      <Section tone="sand" className="pt-10 sm:pt-12">
        <div className={cn(PAGE_CONTAINER_CLASS, "mx-auto max-w-3xl text-center")}>
          <h1 className="type-h1-hero text-heading text-balance">
            Traductor Marroquí Español: Darija A Español
          </h1>
          <p className="type-body mx-auto mt-4 max-w-2xl text-body text-pretty">
            Traduce darija marroquí al español de forma rápida y gratuita. Nuestro traductor
            comprende el dialecto de Marruecos, influenciado por bereber y francés, y ofrece
            resultados naturales para conversaciones cotidianas, viajes y negocios.
          </p>
        </div>
      </Section>

      <Section tone="primary-mist" className="pt-0">
        <div className="mx-auto max-w-4xl">
          <TranslatorPanel id={SECTION_IDS.translator} />
        </div>
      </Section>
    </>
  );
}
