import "@/styles/legal-document.css";
import { JsonLd } from "@/components/seo/JsonLd";
import { HEADER_CONTAINER_CLASS, SITE_CONFIG } from "@/lib/constants";
import { legalPageSchemas } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

type LegalPageProps = {
  title: string;
  description: string;
  path: string;
  sections: LegalSection[];
  docLabel?: string;
  pageSchemaType?: "WebPage" | "AboutPage" | "ContactPage";
  /** Rendered directly below the page header (e.g. contact form). */
  topChildren?: React.ReactNode;
  children?: React.ReactNode;
};

export function LegalPage({
  title,
  description,
  path,
  sections,
  docLabel = "Documento Legal",
  pageSchemaType = "WebPage",
  topChildren,
  children,
}: LegalPageProps) {
  return (
    <article data-legal-document className="py-12 md:py-16 lg:py-20">
      <JsonLd
        data={legalPageSchemas({
          title,
          description,
          path,
          pageType: pageSchemaType,
        })}
      />

      <div className={cn(HEADER_CONTAINER_CLASS, "legal-document-shell")}>
        <div className="legal-document-paper">
          <header className="legal-document-header">
            <p className="legal-document-eyebrow">
              <FileText className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
              {docLabel}
              <span aria-hidden />
            </p>
            <h1 className="legal-document-title">{title}</h1>
            <div className="legal-document-meta">
              <span>{SITE_CONFIG.name}</span>
              <span>Última actualización: {SITE_CONFIG.lastUpdated}</span>
            </div>
            <p className="legal-document-intro">{description}</p>
          </header>

          {topChildren ? (
            <div className="legal-document-contact-top">{topChildren}</div>
          ) : null}

          <div className="legal-document-body">
            {sections.map((section, index) => (
              <section key={section.heading} className="legal-document-section">
                <h2 className="legal-document-section__heading">
                  <span className="legal-document-section__num">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  {section.heading}
                </h2>
                <div>
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
            {children}
          </div>

          <footer className="legal-document-footer">
            Este documento forma parte de la información legal de {SITE_CONFIG.name}. Para
            consultas, utilice la página de contacto.
          </footer>
        </div>
      </div>
    </article>
  );
}
