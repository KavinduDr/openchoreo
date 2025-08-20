import eslintConfig from "@open-choreo/eslint-config";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default [
  ...eslintConfig,
  ...compat.extends('plugin:storybook/recommended'),
  ...compat.extends('plugin:storybook/recommended'),
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.js',
      '**/*.jsx',
      '**/*.mjs',
      '**/*.cjs'
    ],
  },
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.rush/**',
      '**/common/temp/**',
      '**/src/Icons/generated/**',
      '**/src/Images/generated/**',
      '**/coverage/**',
      '**/.storybook/**',
      '**/storybook-static/**',
      "**.config.js",
      "**.config.cjs",
      "**/icon_builder/**",
      "**/image_builder/**",
      "**/*.stories.tsx",
       "**/*.test.tsx"
    ],
  }
]
