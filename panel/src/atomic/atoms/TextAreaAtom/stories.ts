import TextAreaAtomComponent from './index.vue';

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
  component: TextAreaAtomComponent,
  title: 'UI/Atoms/Textarea Atom',
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
    jest: ['textareaAtom.spec.ts'],
    docs: {
      description: {
        component: 'Input component.',
      },
      source: {
        code: '<TextAreaAtom />',
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const TextareaAtom = (args: ComponentPropsType) => ({
    components: { TextAreaAtomComponent },
    setup() {
      return { args };
    },
    template: '<TextAreaAtomComponent v-bind="args" />',
});

/**
 * Aassign defualt arguments for controls.
 */
TextareaAtom.args = {
  inputType: 'default',
};