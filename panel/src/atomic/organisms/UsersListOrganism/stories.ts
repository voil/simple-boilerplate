import UsersListOrganismComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = { };

/**
 * Export default component.
 */
export default {
  component: UsersListOrganismComponent,
  title: 'UI/Organisms/Users List Organism',
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'User list organism component.',
      },
      source: {
        code: `
          <UsersListOrganism />
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const UsersListOrganism = (args: ComponentPropsType) => ({
    components: { UsersListOrganismComponent },
    setup() {
      return { args };
    },
    template: `
      <UsersListOrganismComponent v-bind="args" />
    `,
});

UsersListOrganism.args = {};