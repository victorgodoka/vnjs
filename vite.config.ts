import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

export default defineConfig({
  root: '.',
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        dashboard: path.resolve(__dirname, 'dashboard.html'),
        preview: path.resolve(__dirname, 'preview.html'),
      },
    },
  },
  plugins: [
    tailwindcss(),
  ],
});
