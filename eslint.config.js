import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config({
    extends: [eslint.configs.recommended, tseslint.configs.recommended, eslintConfigPrettier],
    languageOptions: {
        globals: {
            ...globals.node,
        },
    },
    ignores: ["node_modules/**/*", "build/**/*", "dist/**/*", "**/NetscriptDefinitions.d.ts"],
    rules: {
        "prefer-const": "error",
        "no-constant-condition": 1,
        "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
});
