import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
};

type LegalPageProps = {
  title: string;
  description: string;
  path: string;
  sections: LegalSection[];
};

export function LegalPage({ title, description, path, sections }: LegalPageProps) {
  return (
    <article className="bg-bg py-16 md:py-20">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: title, path },
          ]),
          articleSchema({ title, description, path }),
        ]}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <header className="mb-10 border-b border-border pb-8">
          <h1 className="type-h1-hero mb-4">{title}</h1>
          <p className="type-small">Last updated: {SITE_CONFIG.lastUpdated}</p>
          <p className="type-body mt-4">{description}</p>
        </header>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="type-h2-section mb-4">{section.heading}</h2>
              <div className="space-y-4">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="type-body">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
