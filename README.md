# DevOS — Developer Workspace

> The operating system for modern developers. Curated tools, resources, and inspiration for the AI era.

## Overview

DevOS is a futuristic developer navigation station built with Astro, React, TypeScript, and TailwindCSS. It features a premium design inspired by Linear, Raycast, Vercel, and Apple Developer aesthetics.

## Features

- **Hero Section** — Full-screen with animated gradient text, typewriter effect, floating cards, and spotlight effects
- **Category Navigation** — Horizontally scrollable category filter with drag support and mouse wheel scrolling
- **Masonry Grid** — Responsive masonry layout for resource cards with hover glow effects
- **Command Menu** — Raycast-style command palette with `Cmd+K` trigger, fuzzy search, and keyboard navigation
- **Dock Menu** — macOS-style dock with smooth hover animations
- **Scroll Progress** — Animated scroll progress bar at the top
- **Cursor Glow** — Subtle cursor-following spotlight effect
- **Dark Mode** — OLED-friendly deep space gray theme
- **SEO Optimized** — Dynamic meta tags, Open Graph, Twitter Cards, sitemap, robots.txt, RSS feed

## Tech Stack

- [Astro](https://astro.build/) v6 — Static site generation with Islands architecture
- [React](https://react.dev/) v19 — Interactive UI components
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [TailwindCSS](https://tailwindcss.com/) v4 — Utility-first styling
- [Framer Motion](https://www.framer.com/motion/) — Animations and gestures
- [shadcn/ui](https://ui.shadcn.com/) patterns — Component architecture
- [Iconify](https://iconify.design/) — Icon system
- [Lucide React](https://lucide.dev/) — Additional icons

## Project Structure

```
dev-os/
├── astro.config.mjs          # Astro configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── vercel.json               # Vercel deployment config
├── package.json
├── public/
│   ├── favicon.svg           # Site favicon
│   └── robots.txt            # SEO robots
├── src/
│   ├── content.config.ts     # Content collections config
│   ├── content/
│   │   └── sites/            # Resource data (Markdown)
│   ├── layouts/
│   │   └── Layout.astro      # Root layout with SEO
│   ├── pages/
│   │   ├── index.astro       # Home page
│   │   ├── sitemap.xml.ts    # Dynamic sitemap
│   │   └── rss.xml.ts        # RSS feed
│   ├── components/
│   │   ├── effects/          # Animation components
│   │   │   ├── Aurora.tsx
│   │   │   ├── BlurOrb.tsx
│   │   │   ├── CursorGlow.tsx
│   │   │   ├── GridPattern.tsx
│   │   │   ├── Meteors.tsx
│   │   │   ├── NumberTicker.tsx
│   │   │   ├── PageLoader.tsx
│   │   │   ├── ScrollProgress.tsx
│   │   │   ├── SectionReveal.tsx
│   │   │   ├── Spotlight.tsx
│   │   │   ├── TextReveal.tsx
│   │   │   └── Typewriter.tsx
│   │   ├── hero/
│   │   │   ├── CTASection.tsx
│   │   │   ├── FeaturedSection.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   └── StatsSection.tsx
│   │   ├── masonry/
│   │   │   ├── MasonryGrid.tsx
│   │   │   └── SiteCard.tsx
│   │   ├── navigation/
│   │   │   ├── CategoryScroll.tsx
│   │   │   └── DockMenu.tsx
│   │   ├── search/
│   │   │   └── CommandMenu.tsx
│   │   └── ClientWrappers.tsx # React state wrappers
│   ├── hooks/                # Custom React hooks
│   ├── lib/
│   │   └── utils.ts          # Utility functions (cn, etc.)
│   ├── styles/
│   │   └── global.css        # Global styles & Tailwind
│   ├── types/
│   │   └── index.ts          # TypeScript types
│   └── ...
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Content Management

Resources are stored as Markdown files in `src/content/sites/` with frontmatter:

```yaml
---
title: Site Name
description: Brief description
url: https://example.com
category: Frontend
tags: [react, framework]
icon: https://example.com/icon.svg  # optional
featured: false
createdAt: 2024-01-01
---
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Framework preset: Astro
4. Deploy

The included `vercel.json` configures caching headers and security policies.

## Design System

- **Colors**: Black/white/gray palette with minimal blue accents
- **Typography**: Inter (sans) + JetBrains Mono (mono)
- **Spacing**: Generous whitespace, 16px base grid
- **Effects**: Glassmorphism, subtle glows, smooth shadows
- **Animations**: 60fps spring physics, staggered reveals, cursor tracking

## License

MIT
