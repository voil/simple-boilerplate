import InputAtomComponent from './index.vue';

/**
 * @const string[]
 */
const TypesArray: string[] = [
  'error',
  'success',
  'default',
  'disabled',
];

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {
  inputType: string;
  placeholder: string;
};

/**
 * Export default component.
 */
export default {
  component: InputAtomComponent,
  title: 'UI/Atoms/Input Atom',
  argTypes: {
    placeholder: {
      name: 'placeholder',
      description: 'Prop for placeholder component.',
    },
    inputType: {
      name: 'inputType',
      description: 'Prop for type component.',
      options: TypesArray,
      control: { type: 'select' }
    },
    modelValue: {
      disable: true,
      control: { type: null }
    },
  },
  parameters: {
    jest: ['inputAtom.spec.ts'],
    docs: {
      description: {
        component: 'Input component.',
      },
      source: {
        code: '<InputAtom />',
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const InputAtom = (args: ComponentPropsType) => ({
    components: { InputAtomComponent },
    setup() {
      return { args };
    },
    template: '<InputAtomComponent v-bind="args" />',
});

/**
 * Aassign defualt arguments for controls.
 */
InputAtom.args = {
  inputType: 'default',
};