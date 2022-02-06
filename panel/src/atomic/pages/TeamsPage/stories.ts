import TeamsPageComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {};

/**
 * Export default component.
 */
export default {
  component: TeamsPageComponent,
  title: 'UI/Pages/Teams Page',
  parameters: {
    docs: {
      description: {
        component: 'Teams page component.',
      },
      source: {
        code: `
          <TeamsPage />
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const TeamsPage = (args: ComponentPropsType) => ({
    components: { TeamsPageComponent },
    setup() {
      return { args };
    },
    template: `
      <TeamsPageComponent v-bind="args" />
    `,
});