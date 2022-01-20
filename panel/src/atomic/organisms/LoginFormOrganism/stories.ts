import LoginFormOrganismComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = { };


/**
 * Export default component.
 */
export default {
  component: LoginFormOrganismComponent,
  title: 'UI/Organisms/Login Form Organism',
  argTypes: {
    texts: {
      name: 'texts',
      description: 'Prop for texts form.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Login form organism component.',
      },
      source: {
        code: `
          <LoginFormOrganism />
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const LoginFormOrganism = (args: ComponentPropsType) => ({
    components: { LoginFormOrganismComponent },
    setup() {
      return { args };
    },
    template: `
      <LoginFormOrganismComponent v-bind="args" />
    `,
});

LoginFormOrganism.args = {
  texts: {
    email: {
      label: 'E-email:*',
      placeholder: 'Enter user e-mail...'
    },
    password: {
      label: 'Password:*',
      placeholder: 'Enter user password...'
    },
    button: 'Login in to platform',
    spinnerMessage: '',
    alerts: {
      success: {
        title: 'Success authentication',
        description: 'Correct login to the platform. There will be a redirection in a moment.',
      },
      error: {
        title: 'Error authentication',
        description: 'Incorrect login to the panel. Incorrect e-mail or password. Please try again in a moment.',
      },
    },
  },
}