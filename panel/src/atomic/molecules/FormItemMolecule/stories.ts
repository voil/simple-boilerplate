import FormItemMoleculeComponent from './index.vue';
import InputAtomComponent from '@/atomic/atoms/InputAtom/index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {
  label: string;
  errorMessage: string;
};


/**
 * Export default component.
 */
export default {
  component: FormItemMoleculeComponent,
  title: 'UI/Molecules/Form Item Molecule',
  argTypes: {
    label: {
      name: 'label',
      description: 'Prop for label form item.',
    },
    errorMessage: {
      name: 'errorMessage',
      description: 'Prop for messge error.', 
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Form item molecule component.',
      },
      source: {
        code: `
          <FormItemMolecule label="Lorem Ipsum">Lorem ipsum</FormItemMolecule>
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const FormItemMolecule = (args: ComponentPropsType) => ({
    components: { FormItemMoleculeComponent, InputAtomComponent },
    setup() {
      return { args };
    },
    template: `
      <FormItemMoleculeComponent v-bind="args">
        <InputAtomComponent />
      </FormItemMoleculeComponent>
    `,
});

FormItemMolecule.args = {
  label: 'Lorem ipsum',
}
