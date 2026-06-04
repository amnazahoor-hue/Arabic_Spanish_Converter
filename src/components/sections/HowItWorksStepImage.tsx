import { HOW_IT_WORKS_IMAGES } from "@/content/howItWorksImages";
import { cn } from "@/lib/utils";
import Image from "next/image";

const DEFAULT_ASPECT = "aspect-[5/3] sm:aspect-[16/10] lg:aspect-auto";

type HowItWorksStepImageProps = {
  stepIndex: number;
  className?: string;
};

export function HowItWorksStepImage({ stepIndex, className }: HowItWorksStepImageProps) {
  const image = HOW_IT_WORKS_IMAGES[stepIndex] ?? HOW_IT_WORKS_IMAGES[0];

  return (
    <figure
      className={cn(
        "group relative m-0 w-full overflow-hidden rounded-[var(--radius)]",
        "border border-border/50 bg-surface-alt shadow-sm",
        image.aspectClass ?? DEFAULT_ASPECT,
        "lg:aspect-auto lg:min-h-0 lg:h-full",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 1024px) 100vw, 360px"
        className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
        style={{ objectPosition: image.objectPosition ?? "center" }}
        priority={stepIndex === 0}
      />
    </figure>
  );
}
