"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(sectionIds: readonly string[], offset = 120) {
  const [activeId, setActiveId] = useState<string | null>(sectionIds[0] ?? null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const onScroll = () => {
      let current: string | null = sectionIds[0] ?? null;
      for (const el of elements) {
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) {
          current = el.id;
        }
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds, offset]);

  return activeId;
}
