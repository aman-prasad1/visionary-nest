import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['antd', 'framer-motion']
        }
      }
    }
  },
  preview: {
    port: 3000,
    strictPort: true
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true
  }
});
