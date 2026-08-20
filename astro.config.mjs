import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';
import webmanifest from 'astro-webmanifest';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://artisticapainting.com',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    robotsTxt(),
    sitemap(),
    webmanifest({
      name: 'Artistica Painting',
      icon: 'public/artistica-logo-favicon.png',
      description:
        'Artistica Painting is a company founded in 2013 whose goal is to provide headache-free painting services all across the Bay Area.',
      start_url: '/',
    }),
    compress({
      // csso silently drops modern `@media (width>=...)` range syntax that
      // Astro 7's build pipeline now emits, stripping all responsive styles.
      CSS: false,
    }),
  ],
});
