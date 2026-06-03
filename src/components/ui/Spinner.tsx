import { cn } from "@/lib/utils";

type SpinnerProps = {
  className?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
};

const sizes = { sm: "h-4 w-4", md: "h-8 w-8", lg: "h-12 w-12" };

export function Spinner({ className, label = "Loading", size = "md" }: SpinnerProps) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)} role="status" aria-live="polite">
      <span
        className={cn(
          "inline-block animate-spin rounded-full border-2 border-border border-t-primary",
          sizes[size],
          "motion-reduce:animate-none motion-reduce:border-t-primary",
        )}
        aria-hidden
      />
      <span className="type-small text-muted sr-only">{label}</span>
    </div>
  );
}
