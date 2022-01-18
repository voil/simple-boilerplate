import DividerAtomComponent from './index.vue';

/**
 * @const string[]
 */
 const TypesArray: string[] = [
  'vertical',
  'horizontal',
];

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {
  dividerType: string;
  color: string;
};


/**
 * Export default component.
 */
export default {
  component: DividerAtomComponent,
  title: 'UI/Atoms/Divider Atom',
  argTypes: {
    dividerType: {
      name: 'dividerType',
      description: 'Prop for type of divider.',
      options: TypesArray,
      control: { type: 'select' }
    },
    color: {
      name: 'color',
      description: 'Prop for color divider.',
      control: { type: 'color' }
    },
  },
  parameters: {
    jest: ['dividerAtom.spec.ts'],
    docs: {
      description: {
        component: 'Divider atom component.',
      },
      source: {
        code: `
        <DividerAtom>
          Lorem ipsum
        </DividerAtom>
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const DividerAtom = (args: ComponentPropsType) => ({
    components: { DividerAtomComponent },
    setup() {
      return { args };
    },
    template: `
    <DividerAtomComponent v-bind="args">
      Lorem ipsum dolor sit amet
    </DividerAtomComponent>
    `,
});

DividerAtom.args = {
  dividerType: 'horizontal',
}
