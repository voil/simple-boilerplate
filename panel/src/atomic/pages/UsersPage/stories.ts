import UsersPageComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {};

/**
 * Export default component.
 */
export default {
  component: UsersPageComponent,
  title: 'UI/Pages/Users Page',
  parameters: {
    docs: {
      description: {
        component: 'Users page component.',
      },
      source: {
        code: `
          <UsersPage />
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const UsersPage = (args: ComponentPropsType) => ({
    components: { UsersPageComponent },
    setup() {
      return { args };
    },
    template: `
      <UsersPageComponent v-bind="args" />
    `,
});