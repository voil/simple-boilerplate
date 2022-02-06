import DashboardPageComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {};

/**
 * Export default component.
 */
export default {
  component: DashboardPageComponent,
  title: 'UI/Pages/Dashboard Page',
  parameters: {
    docs: {
      description: {
        component: 'Dashboard page component.',
      },
      source: {
        code: `
          <DashboardPage />
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const DashboardPage = (args: ComponentPropsType) => ({
    components: { DashboardPageComponent },
    setup() {
      return { args };
    },
    template: `
      <DashboardPageComponent v-bind="args" />
    `,
});