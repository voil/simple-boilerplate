import AuthenticationTemplateComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {
  title: string;
  description: string;
};

/**
 * Export default component.
 */
export default {
  component: AuthenticationTemplateComponent,
  title: 'UI/Templates/Authentication Template',
  argTypes: {
    title: {
      name: 'title',
      description: 'Prop for title.', 
    },
    description: {
      name: 'description',
      description: 'Prop for descrption.', 
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Authentication template component.',
      },
      source: {
        code: `
          <AuthenticationTemplate />
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const AuthenticationTemplate = (args: ComponentPropsType) => ({
    components: { AuthenticationTemplateComponent },
    setup() {
      return { args };
    },
    template: `
      <AuthenticationTemplateComponent v-bind="args" />
    `,
});

AuthenticationTemplate.args = {
  title: 'Lorem ipsum',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet justo lacus. Aenean mi turpis, rutrum eget malesuada eu'
}
