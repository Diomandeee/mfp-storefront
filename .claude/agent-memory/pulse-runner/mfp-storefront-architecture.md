---
name: MFP Storefront Architecture
description: Next.js 15 storefront for Meaning Full Power oracle cards — 10 themes, 5 layouts, Shopify integration, Vercel deploy
type: project
---

Next.js 16 + Tailwind v4 + Framer Motion storefront for the Meaning Full Power oracle card game.

Key files in `/app/`:
- `globals.css` — 10 theme variable blocks + per-theme behavioral CSS overrides (typography, borders, shadows, overlays, button shapes)
- `components/HeroSection.tsx` — 5 hero variants (centered, left-aligned, split, minimal-typographic, brutalist) mapped to themes
- `components/CardBrowser.tsx` — 5 layout-specific card renderers (ClassicCard, CodexCard, MinimalCard, GalleryCard, TriptychGrid)
- `components/ProductsSection.tsx` — 3 product card variants (ClassicProductCard, CodexProductCard, MinimalProductCard)
- `lib/themes.ts` — ThemeId and LayoutId types, THEMES and LAYOUTS arrays
- `lib/theme-context.tsx` — ThemeProvider with localStorage persistence, data-theme/data-layout attributes
- `lib/card-manifest.ts` — 45 cards, 15 chapters

**CRITICAL**: globals.css MUST use `@theme inline { ... }` NOT `@theme { ... }`. Without `inline`, Tailwind's --spacing variable gets overridden and breaks all padding/margin utilities.

**CRITICAL**: No `* { margin: 0; padding: 0 }` reset. Tailwind preflight handles resets.

**Why:** These two CSS issues caused multiple broken deploys before being identified. They are documented in CLAUDE.md.

**How to apply:** Before any CSS edit to globals.css, verify `@theme inline` is present. Before adding any reset, check if Tailwind preflight already covers it.

Deploy: `npx vercel --prod --yes` from project root. Domain: meaningfullpower.com
