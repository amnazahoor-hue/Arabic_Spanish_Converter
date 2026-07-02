"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { Spinner } from "@/components/ui/Spinner";

export function TranslatorLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <Spinner size="lg" label="Traduciendo" />
      <Skeleton lines={4} className="w-full" />
    </div>
  );
}
