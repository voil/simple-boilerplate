import PageListSizerComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {
  optionsSizer: number[];
};

/**
 * Export default component.
 */
export default {
  component: PageListSizerComponent,
  title: 'UI/Atoms/Page List Sizer Atom',
  argTypes: {
    optionsSizer: {
      name: 'optionsSizer',
      description: 'Prop for options page size.',
    },
  },
  parameters: {
    jest: ['pageListSizeAtom.spec.ts'],
    docs: {
      description: {
        component: 'Page list sizer component.',
      },
      source: {
        code: '<PageListSizer />',
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const PageListSizerAtom = (args: ComponentPropsType) => ({
    components: { PageListSizerComponent },
    setup() {
      return { args };
    },
    template: '<PageListSizerComponent v-bind="args" />',
});
