import PrivilagesPageComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {};

/**
 * Export default component.
 */
export default {
  component: PrivilagesPageComponent,
  title: 'UI/Pages/Privilages Page',
  parameters: {
    docs: {
      description: {
        component: 'Privilages page component.',
      },
      source: {
        code: `
          <PrivilagesPage />
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const PrivilagesPage = (args: ComponentPropsType) => ({
    components: { PrivilagesPageComponent },
    setup() {
      return { args };
    },
    template: `
      <PrivilagesPageComponent v-bind="args" />
    `,
});