import { List } from "lucide-react";

export type LegalTocItem = {
  id: string;
  label: string;
  index: number;
};

type LegalTableOfContentsProps = {
  items: LegalTocItem[];
};

export function LegalTableOfContents({ items }: LegalTableOfContentsProps) {
  if (items.length < 3) return null;

  return (
    <nav className="legal-document-toc" aria-labelledby="legal-document-toc-heading">
      <p id="legal-document-toc-heading" className="legal-document-toc__title">
        <List className="h-4 w-4" strokeWidth={2} aria-hidden />
        Contenido
      </p>
      <ol className="legal-document-toc__list">
        {items.map(({ id, label, index }) => (
          <li key={id}>
            <a href={`#${id}`} className="legal-document-toc__link">
              <span className="legal-document-toc__num">{String(index + 1).padStart(2, "0")}.</span>
              {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
