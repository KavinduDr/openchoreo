import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: true,
    host: 'localhost',
    port: 4000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react()
  ],
  define: {
    global: 'globalThis',
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router'],
          'intl-vendor': ['react-intl'],
          'lodash-vendor': ['lodash'],
          // Design system chunk
          'design-system': ['@open-choreo/design-system'],
          // Common views chunk
          'common-views': ['@open-choreo/common-views'],
          // Plugin chunks
          'plugin-core': ['@open-choreo/plugin-core'],
          'plugin-overview': ['@open-choreo/plugin-overview'],
          'plugin-top-level-selector': ['@open-choreo/plugin-top-level-selector'],
          'plugin-top-right-menu': ['@open-choreo/top-right-menu'],
          'plugin-choreo-context': ['@open-choreo/choreo-context'],
        }
      }
    }
  }
});
