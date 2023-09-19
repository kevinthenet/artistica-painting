import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-robots-txt';
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import webmanifest from "astro-webmanifest";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://artisticapainting.com",
  integrations: [robotsTxt(), sitemap(), tailwind(), webmanifest({
    name: 'Artistica Painting',
    icon: 'public/chb-logo.png',
    description: 'Artistica Painting is a company founded in 2013 whose goal is to provide headache-free painting services all across the Bay Area.',
    start_url: '/',
  }), compress(),],
});
