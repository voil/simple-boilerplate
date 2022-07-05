import ProfileListOgranismComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = { };

/**
 * Export default component.
 */
export default {
  component: ProfileListOgranismComponent,
  title: 'UI/Organisms/Profile List Organism',
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'Profile list organism component.',
      },
      source: {
        code: `
          <ProfileListOgranism />
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const ProfileListOgranism = (args: ComponentPropsType) => ({
    components: { ProfileListOgranismComponent },
    setup() {
      return { args };
    },
    template: `
      <ProfileListOgranismComponent v-bind="args" />
    `,
});

ProfileListOgranism.args = {};