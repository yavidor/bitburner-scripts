import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config({
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommended,
    eslintConfigPrettier,
  ],
  ignores: [
    "node_modules/**/*",
    "build/**/*",
    "dist/**/*",
    "**/NetscriptDefinitions.d.ts",
  ],
  rules: {
    "prefer-const": "error",
    "no-constant-condition": 1,
  },
});
