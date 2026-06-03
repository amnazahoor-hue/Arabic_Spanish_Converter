import { cn } from "@/lib/utils";

type SkeletonProps = {
  className?: string;
  lines?: number;
};

export function Skeleton({ className, lines = 3 }: SkeletonProps) {
  return (
    <div className={cn("space-y-3 w-full", className)} aria-hidden>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-4 rounded-[var(--radius)] bg-surface-alt animate-pulse motion-reduce:animate-none",
            i === lines - 1 && "w-4/5",
          )}
          style={{ width: i === lines - 1 ? "80%" : "100%" }}
        />
      ))}
    </div>
  );
}
