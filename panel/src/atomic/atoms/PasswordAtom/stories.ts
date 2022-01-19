import PasswordAtomComponent from './index.vue';

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
  component: PasswordAtomComponent,
  title: 'UI/Atoms/Password Atom',
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
    jest: ['passwordAtom.spec.ts'],
    docs: {
      description: {
        component: 'Input component.',
      },
      source: {
        code: '<PasswordAtom />',
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const PasswordAtom = (args: ComponentPropsType) => ({
    components: { PasswordAtomComponent },
    setup() {
      return { args };
    },
    template: '<PasswordAtomComponent v-bind="args" />',
});

/**
 * Aassign defualt arguments for controls.
 */
 PasswordAtom.args = {
  inputType: 'default',
};