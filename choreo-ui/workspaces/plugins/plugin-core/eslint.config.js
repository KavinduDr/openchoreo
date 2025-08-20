import eslintConfig from "@open-choreo/eslint-config";;

export default [
  ...eslintConfig,
  {
    files: [
      "**/*.ts",
      "**/*.tsx",
      "**/*.js",
      "**/*.jsx",
      "**/*.mjs",
      "**/*.cjs",
    ],
  },
  {
    ignores: ["**/dist", "**/node_modules"],
  },
];
