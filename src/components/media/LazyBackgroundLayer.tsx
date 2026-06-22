"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type LazyBackgroundLayerProps = {
  src: string;
  className?: string;
  /** Above-the-fold / LCP backgrounds load immediately. */
  priority?: boolean;
};

export function LazyBackgroundLayer({ src, className, priority = false }: LazyBackgroundLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(priority);

  useEffect(() => {
    if (priority || loaded) return;

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [priority, loaded]);

  return (
    <div
      ref={ref}
      className={cn(className)}
      aria-hidden
      style={loaded ? { backgroundImage: `url("${src}")` } : undefined}
    />
  );
}
