"use client";

import { useEffect, useState } from "react";

function getScrollOffset() {
  const header = document.querySelector("header");
  const headerHeight = header?.getBoundingClientRect().height ?? 67;
  return headerHeight + 12;
}

export function useScrollSpy(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const update = () => {
      const offset = getScrollOffset();
      const scrollLine = window.scrollY + offset;
      const firstTop = elements[0]?.offsetTop ?? 0;

      if (scrollLine < firstTop) {
        setActiveId(null);
        return;
      }

      let current: string | null = null;
      for (const el of elements) {
        if (scrollLine >= el.offsetTop) {
          current = el.id;
        }
      }

      setActiveId(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    ro?.observe(document.body);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro?.disconnect();
    };
  }, [sectionIds]);

  return activeId;
}
