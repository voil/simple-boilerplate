import ProjectsPageComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {};

/**
 * Export default component.
 */
export default {
  component: ProjectsPageComponent,
  title: 'UI/Pages/Projects Page',
  parameters: {
    docs: {
      description: {
        component: 'Projects page component.',
      },
      source: {
        code: `
          <ProjectsPage />
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const ProjectsPage = (args: ComponentPropsType) => ({
    components: { ProjectsPageComponent },
    setup() {
      return { args };
    },
    template: `
      <ProjectsPageComponent v-bind="args" />
    `,
});