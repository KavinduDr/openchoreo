import eslintConfig from "../../../eslint.config.base.cjs"
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default [
  ...eslintConfig,
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
    ],
  }
]
