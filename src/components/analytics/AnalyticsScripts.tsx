import { GA_MEASUREMENT_ID } from "@/lib/constants";

const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID?.trim();

export function AnalyticsScripts() {
  if (!clarityId) return null;

  return (
    <script
      id="clarity-init"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        `,
      }}
    />
  );
}

export function resolveGaMeasurementId(): string | null {
  const fromEnv = process.env.NEXT_PUBLIC_GA_ID?.trim();
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === "production") return GA_MEASUREMENT_ID;
  return null;
}
