"use client";

import { GoogleAnalytics } from "@next/third-parties/google";

type DeferredGoogleAnalyticsProps = {
  gaId: string;
};

/** Loaded client-only so analytics never blocks translator SSR or hydration. */
export function DeferredGoogleAnalytics({ gaId }: DeferredGoogleAnalyticsProps) {
  return <GoogleAnalytics gaId={gaId} />;
}
