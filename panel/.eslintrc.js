module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/vue3-essential", "@vue/airbnb", "@vue/typescript/recommended", "plugin:storybook/recommended"],
  parserOptions: {
    ecmaVersion: 2020
  },
  ignorePatterns: ["**/e2e.spec.js"],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'new-cap': 'off',
    'import/prefer-default-export': 'off',
    'no-nested-ternary': 'off',
    'no-return-await': 'off',
    'consistent-return': 'off'
  },
  overrides: [{
    files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
    env: {
      jest: true
    }
  }]
};