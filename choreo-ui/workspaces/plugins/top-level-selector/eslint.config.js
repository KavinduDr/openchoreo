import eslintConfig from "../../../eslint.config.base.cjs";

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
    ignores: ["**/dist"],
  },
];
