/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="vitest" />
/// <reference types="node" />
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { peerDependencies } from './package.json';
import type { UserConfig } from 'vite';
import type { InlineConfig } from 'vitest';
import path from 'path';

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

export default defineConfig({
  resolve: {
    alias: {
      '@open-choreo/common-views': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'choreo-common-views',
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
