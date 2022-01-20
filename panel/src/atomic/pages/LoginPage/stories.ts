import LoginPageComponent from './index.vue';

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
  component: LoginPageComponent,
  title: 'UI/Pages/Login Page',
  parameters: {
    docs: {
      description: {
        component: 'Login page component.',
      },
      source: {
        code: `
          <LoginPage />
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const LoginPage = (args: ComponentPropsType) => ({
    components: { LoginPageComponent },
    setup() {
      return { args };
    },
    template: `
      <LoginPageComponent v-bind="args" />
    `,
});