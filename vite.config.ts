import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';

const industries = [
  'Fashion & Lifestyle',
  'Beauty & Skincare',
  'Tech & Fintech',
  'Food & Beverage',
  'Entertainment & Music',
  'Real Estate',
  'Events & Experiences',
];

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const dynamicRoutes = industries.flatMap((name) => [
  `/service/${toSlug(name)}`,
  `/solutions/${toSlug(name)}`,
]);

const routes = [
  '/about-us',
  '/service',
  '/features',
  '/solutions',
  '/pricing',
  '/resources',
  '/contact',
  '/work',
  '/privacy',
  '/terms',
  '/studio',
  '/talent-form',
  ...dynamicRoutes,
];

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://mediabossafrica.com',
      dynamicRoutes: routes,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
