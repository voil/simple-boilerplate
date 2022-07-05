import ProfilesPageComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {};

/**
 * Export default component.
 */
export default {
  component: ProfilesPageComponent,
  title: 'UI/Pages/Profiles Page',
  parameters: {
    docs: {
      description: {
        component: 'Profiles page component.',
      },
      source: {
        code: `
          <ProfilesPage />
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const ProfilesPage = (args: ComponentPropsType) => ({
    components: { ProfilesPageComponent },
    setup() {
      return { args };
    },
    template: `
      <ProfilesPageComponent v-bind="args" />
    `,
});