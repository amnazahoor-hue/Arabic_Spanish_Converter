"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { scheduleLayoutRead } from "@/lib/scheduleLayoutRead";
import {
  createElement,
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";

type MotionTag = "div" | "ul" | "li" | "header";

type MotionOptions = {
  initial?: unknown;
  animate?: unknown;
  variants?: unknown;
  transition?: unknown;
  whileInView?: unknown;
  viewport?: unknown;
};

type LazyMotionProps<T extends MotionTag> = ComponentPropsWithoutRef<T> & {
  tag: T;
  reduceMotion?: boolean;
  motion?: MotionOptions;
  children?: ReactNode;
};

function LazyMotion<T extends MotionTag>({
  tag,
  motion,
  reduceMotion: reduceMotionProp,
  children,
  ...rest
}: LazyMotionProps<T>) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const reduceMotion = reduceMotionProp ?? prefersReducedMotion;
  const [MotionTag, setMotionTag] = useState<ElementType | null>(null);

  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;
    let cancelSchedule = () => {};

    cancelSchedule = scheduleLayoutRead(() => {
      void import("framer-motion").then((mod) => {
        if (cancelled) return;
        const candidate = mod.motion[tag as keyof typeof mod.motion];
        if (candidate) setMotionTag(() => candidate as ElementType);
      });
    });

    return () => {
      cancelled = true;
      cancelSchedule();
    };
  }, [tag, reduceMotion]);

  if (reduceMotion || !MotionTag) {
    return createElement(tag, rest, children);
  }

  const motionProps = motion ?? {};

  return createElement(MotionTag, {
    ...rest,
    ...motionProps,
    initial: motionProps.initial ?? false,
    children,
  });
}

export function LazyMotionDiv(props: Omit<LazyMotionProps<"div">, "tag">) {
  return <LazyMotion tag="div" {...props} />;
}

export function LazyMotionUl(props: Omit<LazyMotionProps<"ul">, "tag">) {
  return <LazyMotion tag="ul" {...props} />;
}

export function LazyMotionLi(props: Omit<LazyMotionProps<"li">, "tag">) {
  return <LazyMotion tag="li" {...props} />;
}

export function LazyMotionHeader(props: Omit<LazyMotionProps<"header">, "tag">) {
  return <LazyMotion tag="header" {...props} />;
}
