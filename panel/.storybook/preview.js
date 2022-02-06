import { withTests } from "@storybook/addon-jest";
import results from './.jest-test-results.json';
import vueRouter from 'storybook-vue3-router';

/**
 * Adding a global decorator to stories.
 * Test injection is provided.
 */
 export const decorators = [
  vueRouter(),
  withTests({
    results,
  }),(story, { globals: { locale } }) => {
  return {
    components: { story },
    template: '<story />',
  };
}];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}