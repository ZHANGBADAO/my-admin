module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
    'plugin:prettier/recommended',
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  "plugins": [
    "vue",
    "@typescript-eslint",
    "prettier",
  ],
  "rules": {
    "prettier/prettier": "error",
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true, varsIgnorePattern: '^_' }],
  }
}
