import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://api.igdb.com/v4', // The base URL of your API server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite the URL path
      },
    },
  },
  plugins: [react()],
  base: "/gamesearch/"
});
