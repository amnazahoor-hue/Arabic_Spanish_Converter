import type { LegalSection } from "@/components/legal/LegalPage";

function slugifyHeading(heading: string): string {
  return heading
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function buildLegalSectionIds(sections: readonly LegalSection[]): string[] {
  const used = new Set<string>();

  return sections.map((section, index) => {
    let id = slugifyHeading(section.heading) || `section-${index + 1}`;
    if (used.has(id)) {
      id = `${id}-${index + 1}`;
    }
    used.add(id);
    return id;
  });
}
