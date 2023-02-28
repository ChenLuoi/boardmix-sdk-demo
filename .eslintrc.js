module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            tsx: true,
            jsx: true
        }
    },
    extends: [
        "plugin:vue/vue3-recommended",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier-vue/recommended"
    ],
    plugins: ["@typescript-eslint"],
    settings: {
        "prettier-vue": {
            SFCBlocks: {
                /**
                 * Use prettier to process `<template>` blocks or not
                 *
                 * If set to `false`, remember not to `extends: ['prettier/vue']`, as you need the rules from `eslint-plugin-vue` to lint `<template>` blocks
                 *
                 * @default true
                 */
                template: false
                // style: false
            }
        }
    },
    globals: {
        defineProps: "readonly",
        defineEmits: "readonly",
        defineExpose: "readonly",
        withDefaults: "readonly"
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "@typescript-eslint/camelcase": "off",
        "no-undef": "off",
        "prettier-vue/prettier": [
            "error",
            {
                semi: true,
                useTabs: true,
                tabWidth: 4
            }
        ],
        "vue/max-attributes-per-line": [
            "warn",
            {
                singleline: {
                    max: 1
                },
                multiline: {
                    max: 1
                }
            }
        ],
        "vue/html-indent": [
            "error",
            "tab",
            {
                baseIndent: 1
            }
        ],
        "@typescript-eslint/explicit-module-boundary-types": "off"
    }
};
