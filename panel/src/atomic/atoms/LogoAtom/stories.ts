import LogoAtomComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {
  image: string;
};

/**
 * Export default component.
 */
export default {
  component: LogoAtomComponent,
  title: 'UI/Atoms/Logo Atom',
  argTypes: {
    image: {
      name: 'image',
      description: 'Prop for image logo.',
    },
  },
  parameters: {
    jest: ['logoAtom.spec.ts'],
    docs: {
      description: {
        component: 'Logo component.',
      },
      source: {
        code: '<LogoAtom image="http://image.pl/image.png" />',
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const LogoAtom = (args: ComponentPropsType) => ({
    components: { LogoAtomComponent },
    setup() {
      return { args };
    },
    template: '<LogoAtomComponent v-bind="args" />',
});
