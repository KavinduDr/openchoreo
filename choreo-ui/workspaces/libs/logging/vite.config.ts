/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="vitest" />
/// <reference types="node" />
import path from 'path';
import { defineConfig, UserConfig } from 'vite';
import dts from 'vite-plugin-dts';
import type { InlineConfig } from 'vitest';
import { peerDependencies } from './package.json';

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

export default defineConfig({
  resolve: {
    alias: {
      '@open-choreo/logging': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'choreo-logging',
      fileName: (format) => `index.${format}.js`,
      formats: ['cjs', 'es'],
    },
    rollupOptions: {
      external: [...Object.keys(peerDependencies)],
    },
    cssCodeSplit: false,
    sourcemap: true,
    emptyOutDir: true,
  },
  css: {
    modules: {
      generateScopedName: '[local]_[hash:base64:5]',
      localsConvention: 'camelCase',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
  },
  plugins: [
    dts({
      exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
      include: ['src'],
    }),
  ],
} as VitestConfigExport);
