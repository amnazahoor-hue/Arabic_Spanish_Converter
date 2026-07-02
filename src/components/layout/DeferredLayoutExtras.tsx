"use client";

import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@/components/layout/Footer").then((mod) => mod.Footer), {
  loading: () => null,
  ssr: false,
});

const DeferredGoogleAnalytics = dynamic(
  () =>
    import("@/components/analytics/DeferredGoogleAnalytics").then(
      (mod) => mod.DeferredGoogleAnalytics,
    ),
  { ssr: false },
);

const DeferredAnalyticsScripts = dynamic(
  () => import("@/components/analytics/AnalyticsScripts").then((mod) => mod.AnalyticsScripts),
  { ssr: false },
);

type DeferredLayoutExtrasProps = {
  gaMeasurementId: string | null;
};

export function DeferredLayoutExtras({ gaMeasurementId }: DeferredLayoutExtrasProps) {
  return (
    <>
      <Footer />
      {gaMeasurementId ? <DeferredGoogleAnalytics gaId={gaMeasurementId} /> : null}
      <DeferredAnalyticsScripts />
    </>
  );
}
