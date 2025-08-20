
import js from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import pluginJestDom from 'eslint-plugin-jest-dom';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginStorybook from 'eslint-plugin-storybook';
import pluginTestingLibrary from 'eslint-plugin-testing-library';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  js.configs.recommended,
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginPrettierRecommended,
  pluginTestingLibrary.configs['flat/react'],
  pluginJestDom.configs['flat/recommended'],
  pluginReactHooks.configs['recommended-latest'],
  pluginImport.flatConfigs.recommended,
  pluginStorybook.configs['flat/recommended'],
  {
    ignores: ['eslint.config.js'],
  },
  {
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      'prettier/prettier': ['error'],
      '@typescript-eslint/no-unused-vars': ['error'],
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': 'warn',
      '@typescript-eslint/no-use-before-define': [
        'error',
        { functions: false },
      ],
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
      // Disable prop-type validation since we are using TypeScript, which provides compile-time static type checking
      'react/prop-types': 'off',
      'import/extensions': 'off',
      'import/no-extraneous-dependencies': 'off',
      'max-len': ['error', { code: 120, tabWidth: 2 }],
      'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }],
      '@typescript-eslint/no-shadow': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
        },
      ],
      'import/no-unresolved': [
        'error',
        {
          ignore: ['^@wso2-enterprise/'],
        },
      ],
      'no-duplicate-imports': 'error',
      // Temporary disable rules that are causing issues
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-unsafe-function-type': 'warn',
      'no-constant-binary-expression': 'warn',
    },
  }
);
