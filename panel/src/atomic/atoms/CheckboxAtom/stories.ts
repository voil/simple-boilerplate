import CheckboxAtomComponent from './index.vue';

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
  type: string;
};

/**
 * Export default component.
 */
export default {
  component: CheckboxAtomComponent,
  title: 'UI/Atoms/Checkbox Atom',
  argTypes: {
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
    jest: ['checkboxAtom.spec.ts'],
    docs: {
      description: {
        component: 'Checkbox component.',
      },
      source: {
        code: '<CheckboxAtom />',
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const CheckboxAtom = (args: ComponentPropsType) => ({
    components: { CheckboxAtomComponent },
    setup() {
      return { args };
    },
    template: '<CheckboxAtomComponent v-bind="args" />',
});

/**
 * Aassign defualt arguments for controls.
 */
CheckboxAtom.args = {
  inputType: 'default',
};