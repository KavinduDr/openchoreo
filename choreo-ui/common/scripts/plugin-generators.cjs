/**
 * Converts PascalCase to kebab-case
 * @param {string} str - PascalCase string
 * @returns {string} kebab-case string
 */
function toKebabCase(str) {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
}

/**
 * Generates the package.json content for a plugin
 * @param {string} pluginName - Name of the plugin
 * @returns {string} Package.json content
 */
function generatePackageJson(pluginName) {
    return `{
  "name": "@open-choreo/${toKebabCase(pluginName)}",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "baseUrl": ".",
  "files": [
    "dist"
  ],
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1",
    "dev": "tsc -project tsconfig.json  --watch",
    "clean": "rm -rf dist",
    "lint": "eslint --config ./eslint.config.js",
    "build": "npm run clean && tsc -project tsconfig.json"
  },
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "@open-choreo/design-system": "workspace:*",
    "@open-choreo/common-views": "workspace:*",
    "@open-choreo/plugin-core": "workspace:*",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "@eslint/eslintrc": "~3.3.1",
    "@typescript-eslint/eslint-plugin": "~8.33.1",
    "@typescript-eslint/parser": "~8.33.1",
    "eslint-plugin-import": "~2.31.0",
    "eslint-plugin-jest-dom": "~5.5.0",
    "eslint-plugin-react": "~7.37.5",
    "eslint-plugin-testing-library": "~7.4.0",
    "@types/lodash": "~4.17.17",
    "lodash": "~4.17.21",
    "clsx": "~2.1.1",
    "@fontsource/roboto": "~5.2.5",
    "react-router": "~7.6.2"
  },
  "devDependencies": {
    "@eslint/js": "~9.28.0",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "eslint": "~9.28.0",
    "eslint-plugin-react-hooks": "~5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "~16.2.0",
    "typescript": "~5.8.3",
    "typescript-eslint": "^8.30.1",
    "eslint-plugin-prettier": "~5.4.1",
    "lodash": "^4.17.21",
    "@types/lodash": "^4.17.17"
  }
}`;
}

/**
 * Generates the tsconfig.json content for a plugin
 * @returns {string} tsconfig.json content
 */
function generateTsConfig() {
    return `{
  // "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true,
    "declarationDir": "dist",
    "sourceMap": true,
    "esModuleInterop": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"], 
    "jsx": "react-jsx",
    "module": "ESNext",
    "target": "ESNext",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "baseUrl": ".",
    "rootDir": "."
  },
  "include": ["./index.ts"],
  "exclude": [
    "node_modules",
    "dist"
  ]
}`;
}

/**
 * Generates the eslint.config.js content for a plugin
 * @returns {string} eslint.config.js content
 */
function generateEslintConfig() {
    return `import eslintConfig from "../../../eslint.config.base.cjs"

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
      "**/dist",
    ],
  }
]`;
}

/**
 * Generates the main index.ts content for a plugin
 * @returns {string} index.ts content
 */
function generateMainIndex() {
    return `export * from "./src";`;
}

/**
 * Generates the src/index.ts content for a plugin
 * @param {string} pluginName - Name of the plugin
 * @returns {string} src/index.ts content
 */
function generateSrcIndex(pluginName) {
    const pluginKey = pluginName.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase();
    const pluginDisplayName = pluginName.replace(/([A-Z])/g, ' $1').trim();
    
    return `import { type PluginManifest } from "@open-choreo/plugin-core";

import {panel} from "./panel";

export const ${pluginName[0].toLowerCase() + pluginName.slice(1)}Plugin = {
    name: "${pluginDisplayName}",
    description: "${pluginDisplayName} Plugin",
    extensions: [panel],
} as PluginManifest;`;
}

/**
 * Generates the panel/index.tsx content for a plugin
 * @param {string} pluginName - Name of the plugin
 * @returns {string} panel/index.tsx content
 */
function generatePanelIndex(pluginName) {
    const pluginKey = pluginName.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase();
    
    return `import { type PluginExtension, PluginExtensionType } from "@open-choreo/plugin-core";
import React from "react";
const ${pluginName}Panel = React.lazy(() => import("./${pluginName}Panel"));

export const panel: PluginExtension = {
    type: PluginExtensionType.PANEL,
    extentionPointId: "header.left",
    key: "${pluginKey}",
    component: ${pluginName}Panel,
};`;
}

/**
 * Generates the panel component content for a plugin
 * @param {string} pluginName - Name of the plugin
 * @returns {string} panel component content
 */
function generatePanelComponent(pluginName) {
    return `import { Box, Typography, useChoreoTheme } from "@open-choreo/design-system";
import React from "react";

const ${pluginName}Panel: React.FC = () => {
    const theme = useChoreoTheme();
    return (
        <Box 
            display="flex" 
            flexDirection="row" 
            gap={theme.spacing(1)} 
            padding={theme.spacing(0, 2)} 
            alignItems="center" 
            height="100%"
        >
            <Box 
                display="flex" 
                flexDirection="row" 
                backgroundColor="secondary.light" 
                gap={theme.spacing(1)} 
                alignItems="center" 
                padding={theme.spacing(0.5)}
            >
                <Typography variant="h4">
                    ${pluginName}
                </Typography>
            </Box>
        </Box>
    );
};

export default ${pluginName}Panel;`;
}

/**
 * Generates the .gitignore content for a plugin
 * @returns {string} .gitignore content
 */
function generateGitignore() {
    return `node_modules
dist

#storybook build directory
storybook-static
*storybook.log`;
}

module.exports = {
    generatePackageJson,
    generateTsConfig,
    generateEslintConfig,
    generateMainIndex,
    generateSrcIndex,
    generatePanelIndex,
    generatePanelComponent,
    generateGitignore
}; 