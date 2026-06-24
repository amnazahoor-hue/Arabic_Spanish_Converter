import { ContactForm } from "@/components/contact/ContactForm";
import { LegalPage } from "@/components/legal/LegalPage";
import { CONTACT_SECTIONS } from "@/content/legal/contact";
import { SITE_ROUTES } from "@/lib/routes";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contáctanos",
  description:
    "Contacte con Traductor Árabe Español: soporte técnico, consultas generales, colaboraciones y preguntas sobre privacidad.",
  path: SITE_ROUTES.contact,
  index: true,
});

export default function ContactPage() {
  return (
    <LegalPage
      title="Contáctanos"
      description="Formulario y canales de contacto para soporte, sugerencias, colaboraciones y ejercicio de derechos de protección de datos."
      path={SITE_ROUTES.contact}
      docLabel="Formulario de contacto"
      pageSchemaType="ContactPage"
      sections={CONTACT_SECTIONS}
      topChildren={
        <div className="legal-document-contact-form">
          <h2 className="legal-document-contact-form__heading">Enviar mensaje</h2>
          <p className="legal-document-contact-form__lead">
            Escríbanos directamente. Respondemos en 1–2 días laborables.
          </p>
          <ContactForm />
        </div>
      }
    />
  );
}
