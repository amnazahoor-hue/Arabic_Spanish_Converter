import { JsonLd } from "@/components/seo/JsonLd";
import { AUTHOR_PROFILE, AUTHOR_SECTIONS } from "@/content/legal/author";
import { PAGE_CONTAINER_CLASS } from "@/lib/constants";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function AuthorPageContent() {
  const { name, role, imageSrc, imageAlt, bio, expertise } = AUTHOR_PROFILE;
  const title = "Author";
  const description = `Conoce a ${name}, ${role.toLowerCase()} en Traductor Árabe Español.`;
  const path = "/author";

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

      <div className={cn(PAGE_CONTAINER_CLASS, "max-w-3xl")}>
        <header className="mb-10 border-b border-border pb-8">
          <h1 className="type-h1-hero mb-4">Author</h1>
          <p className="type-body">{description}</p>
        </header>

        <div
          className={cn(
            "mb-10 flex flex-col items-center gap-6 rounded-[var(--radius-lg)] border border-border/80",
            "bg-surface p-6 shadow-card sm:flex-row sm:items-start sm:p-8",
          )}
        >
          <div className="relative h-44 w-44 shrink-0 overflow-hidden rounded-full border-4 border-primary/20 shadow-md sm:h-48 sm:w-48">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 640px) 176px, 192px"
              className="object-cover object-top"
              priority
            />
          </div>

          <div className="min-w-0 flex-1 text-center sm:text-start">
            <p className="type-small font-semibold uppercase tracking-wider text-primary">
              Experta En Traducción
            </p>
            <h2 className="type-h2-section mt-1 text-heading">{name}</h2>
            <p className="type-body mt-1 text-secondary">{role}</p>
            <p className="type-body mt-4 text-body">{bio}</p>

            <ul className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
              {expertise.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 type-small font-medium text-body"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-10">
          {AUTHOR_SECTIONS.map((section) => (
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

        <p className="type-small mt-10 text-muted">
          Personaje editorial ficticio creado para Traductor Árabe Español. Cualquier parecido con
          personas reales es mera coincidencia.
        </p>

        <Link
          href="/contact"
          className="type-body mt-4 inline-flex text-link hover:text-link-hover"
        >
          Contactar al equipo →
        </Link>
      </div>
    </article>
  );
}
