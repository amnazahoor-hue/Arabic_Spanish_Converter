type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

import { ensureUnicodeSiteUrls } from "@/lib/siteUrl";

export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];
  const json = JSON.stringify(payload.length === 1 ? payload[0] : payload);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: ensureUnicodeSiteUrls(json) }}
    />
  );
}
