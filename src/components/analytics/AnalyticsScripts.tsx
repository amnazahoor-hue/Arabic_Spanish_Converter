import { GA_MEASUREMENT_ID } from "@/lib/constants";
import Script from "next/script";

function resolveGaId(): string | null {
  const fromEnv = process.env.NEXT_PUBLIC_GA_ID?.trim();
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === "production") return GA_MEASUREMENT_ID;
  return null;
}

export function AnalyticsScripts() {
  const gaId = resolveGaId();
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID?.trim();

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="lazyOnload"
          />
          <Script id="ga-init" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      ) : null}
      {clarityId ? (
        <Script id="clarity-init" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityId}");
          `}
        </Script>
      ) : null}
    </>
  );
}
