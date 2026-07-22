import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://portfolio.naeem-ahsan.workers.dev', // Placeholder: replace with the approved canonical domain.
  output: 'static',
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
  },
});
