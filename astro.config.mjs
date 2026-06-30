import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://corsa-legends-compass.pages.dev',
  integrations: [sitemap()],
  output: 'static',
  build: {
    assets: '_assets'
  }
});
