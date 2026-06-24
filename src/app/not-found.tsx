import { Button } from "@/components/ui/Button";
import { SITE_ROUTES } from "@/lib/routes";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center bg-bg">
      <p className="type-small font-medium text-secondary mb-2">404</p>
      <h1 className="type-h1-hero mb-4">Página no encontrada</h1>
      <p className="type-body prose-width mb-8">
        La página que busca no existe o se ha movido. Vuelva al traductor o consulte los enlaces del
        pie de página.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button href={SITE_ROUTES.home}>Volver al inicio</Button>
        <Button variant="outline" href={SITE_ROUTES.contact}>
          Contáctanos
        </Button>
        <Link href={SITE_ROUTES.about} className="type-body text-link self-center">
          Sobre nosotros
        </Link>
      </div>
    </div>
  );
}
