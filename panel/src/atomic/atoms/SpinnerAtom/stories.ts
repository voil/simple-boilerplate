import SpinnerAtomComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {
  message: string;
};

/**
 * Export default component.
 */
export default {
  component: SpinnerAtomComponent,
  title: 'UI/Atoms/Spinner Atom',
  argTypes: {
    message: {
      name: 'message',
      description: 'Prop for message spinner.',
    },
    isVisible: {
      name: 'isVisible',
      description: 'Prop for visible spinner.', 
    },
  },
  parameters: {
    jest: ['spinnerAtom.spec.ts'],
    docs: {
      description: {
        component: 'Spinner component.',
      },
      source: {
        code: '<SpinnerAtom message="message" />',
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const SpinnerAtom = (args: ComponentPropsType) => ({
    components: { SpinnerAtomComponent },
    setup() {
      return { args };
    },
    template: '<SpinnerAtomComponent v-bind="args"><div>Lorem ipsum</div></SpinnerAtomComponent>',
});


SpinnerAtom.args = {
  isVisible: true,
};
