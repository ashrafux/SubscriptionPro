import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 4370, strictPort: true, host: '127.0.0.1' },
  build: {
    rollupOptions: {
      input: { main: resolve(__dirname, 'index.html'), home2: resolve(__dirname, 'home-2.html'), home3: resolve(__dirname, 'home-3.html'), variations: resolve(__dirname, 'variations.html'), stats: resolve(__dirname, 'stats-options.html'), home2Options: resolve(__dirname, 'home-2-options.html') },
    },
  },
});
