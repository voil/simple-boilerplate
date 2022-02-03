import UserLoggedOrganismComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = { };

/**
 * Export default component.
 */
export default {
  component: UserLoggedOrganismComponent,
  title: 'UI/Organisms/User Logged Organism',
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'User logged organism component.',
      },
      source: {
        code: `
          <UserLoggedOrganism />
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const UserLoggedOrganism = (args: ComponentPropsType) => ({
    components: { UserLoggedOrganismComponent },
    setup() {
      return { args };
    },
    template: `
      <UserLoggedOrganismComponent v-bind="args" />
    `,
});