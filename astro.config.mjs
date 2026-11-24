// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Cambiar por el dominio real cuando el cliente lo contrate
  site: 'https://black-house-tattoo.pages.dev',
  vite: {
    plugins: [tailwindcss()],
  },
});
