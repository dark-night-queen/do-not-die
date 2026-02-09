// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expo = require("eslint-config-expo/flat");
const prettier = require("eslint-config-prettier");

module.exports = defineConfig([
  ...expo,
  prettier,
  {
    ignores: ["dist/*", ".expo/*", "node_modules/*"],
  },
  {
    rules: {
      "react/display-name": "off",
      "import/no-unresolved": "off",
    },
  },
]);
