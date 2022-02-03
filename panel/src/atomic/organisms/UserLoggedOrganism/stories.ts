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
  argTypes: {
    menuOptions: {
      name: 'menuOptions',
      description: 'Props for options menu',
    }
  },
  decorators: [() => ({ template: '<div style="padding-left: 200px"><story/></div>' })],
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

UserLoggedOrganism.args = {
  menuOptions: {
    profile: {
      label: 'Profile user'
    },
    logout: {
      label: 'Logout',
      icon: 'lock'
    }
  }
};