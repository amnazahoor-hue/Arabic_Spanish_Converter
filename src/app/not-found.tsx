import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center bg-bg">
      <p className="type-small font-medium text-secondary mb-2">404</p>
      <h1 className="type-h1-hero mb-4">Page not found</h1>
      <p className="type-body prose-width mb-8">
        The page you are looking for does not exist or has moved. Return to the translator or
        browse legal pages from the footer.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Button href="/">Back to home</Button>
        <Button variant="outline" href="/contact">
          Contact
        </Button>
        <Link href="/about" className="type-body text-link self-center">
          About
        </Link>
      </div>
    </div>
  );
}
