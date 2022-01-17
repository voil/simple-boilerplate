import ButtonAtomComponent from './index.vue';

/**
 * @const string[]
 */
 const TypesArray: string[] = [
  'info',
  'error',
  'default',
  'warning',
  'primary',
  'disabled',
];

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {
  buttonType: string;
};


/**
 * Export default component.
 */
export default {
  component: ButtonAtomComponent,
  title: 'UI/Atoms/Button Atom',
  argTypes: {
    buttonType: {
      name: 'buttonType',
      description: 'Prop for type of button.',
      options: TypesArray,
      control: { type: 'select' }
    },
  },
  parameters: {
    jest: ['buttonAtom.spec.ts'],
    docs: {
      description: {
        component: 'Button atom component.',
      },
      source: {
        code: `
        <ButtonAtom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque suscipit hendrerit. Suspendisse massa nisl, commodo ut
        </ButtonAtom>
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const ButtonAtom = (args: ComponentPropsType) => ({
    components: { ButtonAtomComponent },
    setup() {
      return { args };
    },
    template: `
    <ButtonAtomComponent v-bind="args">
      Lorem ipsum dolor sit amet
    </ButtonAtomComponent>
    `,
});

ButtonAtom.args = {
  buttonType: 'primary',
}
