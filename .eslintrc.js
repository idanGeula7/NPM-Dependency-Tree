module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "brace-style": ["error", "1tbs"],
    "no-undef": "off",
    "no-var": "error",
    //indent: ["error", 4],
    "linebreak-style": ["off", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-console": "error",
    "no-unused-vars": "error"
  }
};