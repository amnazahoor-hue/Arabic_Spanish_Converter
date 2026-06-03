# Al-Andalus Translate

Free Arabic ↔ Spanish translator and marketing site built with Next.js App Router, Tailwind CSS v4, and the Al-Andalus design system.

## Quick start

```bash
cd arabic-spanish-translator
cp .env.example .env.local
npm install
npm run dev
```

Set `NEXT_PUBLIC_SITE_URL` to your production URL before deploy (canonical URLs, sitemap, Open Graph, shares).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |

## Environment

See `.env.example` for all variables. Key entries:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Public site URL (SEO, sitemap, WhatsApp share) |
| `TRANSLATE_PROVIDER` | `mymemory` (default) or `azure` |
| `TRANSLATE_API_KEY` | Optional MyMemory private key |
| `NEXT_PUBLIC_SOCIAL_*` | Footer social profile URLs |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 (optional) |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity (optional) |
| `CONTACT_WEBHOOK_URL` | Contact form webhook (optional) |

MyMemory free tier: 500 UTF-8 bytes per request (auto-chunked), ~5000 characters per day.

## Project structure

```
src/
  app/              Routes, API, global styles, OG image
  components/       UI, layout, sections, translator, SEO
  content/          FAQ and legal copy
  hooks/            Translator and scroll-spy
  lib/              Translation, SEO, share, PDF export
  styles/           Viewport-specific CSS (e.g. Nest Hub hero)
```

Homepage: Hero → Translator → How it works → Features → FAQ. Legal pages under `app/(legal)/`.

## Deploy (Vercel)

1. Set root directory to `arabic-spanish-translator`
2. Add environment variables from `.env.example`
3. Build command: `npm run build`

Security headers are configured in `next.config.ts`.

## SEO

- Per-page metadata via `buildMetadata()` in `src/lib/seo.ts`
- Dynamic Open Graph image: `src/app/opengraph-image.tsx`
- `sitemap.xml` and `robots.txt`
- JSON-LD: Organization, WebSite, FAQPage, breadcrumbs on legal pages

After deploy, submit `https://your-domain.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## License

Private — all rights reserved unless stated otherwise.
