import { JsonLd } from "@/components/seo/JsonLd";
import { AUTHOR_PROFILE, AUTHOR_SECTIONS } from "@/content/legal/author";
import { PAGE_CONTAINER_CLASS } from "@/lib/constants";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { GraduationCap, Languages, MapPin, Sparkles, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const DETAIL_ICONS = [MapPin, Languages, GraduationCap, Timer, Sparkles] as const;

export function AuthorPageContent() {
  const { name, role, imageSrc, imageAlt, bio, details, expertise } = AUTHOR_PROFILE;
  const title = "Autora";
  const description = `Conoce a ${name}, ${role} en Traductor Árabe Español.`;
  const path = "/author";

  return (
    <article className="bg-bg py-16 md:py-20">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Inicio", path: "/" },
            { name: title, path },
          ]),
          articleSchema({ title, description, path }),
        ]}
      />

      <div className={cn(PAGE_CONTAINER_CLASS, "max-w-3xl")}>
        <header className="mb-10 border-b border-border pb-8">
          <h1 className="type-h1-hero mb-4">{title}</h1>
          <p className="type-body max-w-2xl">{description}</p>
        </header>

        <div
          className={cn(
            "mb-10 flex flex-col items-center gap-6 rounded-[var(--radius-lg)] border border-border/80",
            "bg-surface p-6 shadow-card sm:flex-row sm:items-start sm:p-8",
          )}
        >
          <div className="relative h-44 w-44 shrink-0 overflow-hidden rounded-full border-4 border-primary/20 shadow-md sm:h-52 sm:w-52">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 640px) 176px, 208px"
              className="object-cover object-[center_18%]"
              priority
            />
          </div>

          <div className="min-w-0 flex-1 text-center sm:text-start">
            <h2 className="type-h2-section text-heading">{name}</h2>
            <p className="type-body mt-1 font-medium text-secondary">{role}</p>
            <p className="type-body mt-4 text-body">{bio}</p>

            <dl className="mt-6 grid gap-3 text-start sm:grid-cols-2">
              {details.map((detail, index) => {
                const Icon = DETAIL_ICONS[index] ?? Sparkles;

                return (
                  <div
                    key={detail.label}
                    className="rounded-[var(--radius)] border border-border/70 bg-section-primary-mist/35 px-3.5 py-3"
                  >
                    <dt className="flex items-center gap-2 type-small font-semibold text-primary">
                      <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
                      {detail.label}
                    </dt>
                    <dd className="mt-1.5 type-small leading-relaxed text-body">{detail.value}</dd>
                  </div>
                );
              })}
            </dl>

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
                  <p key={i} className="type-body leading-relaxed text-body">
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
