import HeaderPageAtomComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {
  headerTitle: string;
  headerDescription: string;
};

/**
 * Export default component.
 */
export default {
  component: HeaderPageAtomComponent,
  title: 'UI/Atoms/Header Page Atom',
  argTypes: {
    headerTitle: {
      name: 'headerTitle',
      description: 'Prop for title header.', 
    },
    headerDescription: {
      name: 'headerDescription',
      description: 'Prop for descrption header.', 
    },
  },
  parameters: {
    jest: ['headerPageAtom.spec.ts'],
    docs: {
      description: {
        component: 'Header page atom component.',
      },
      source: {
        code: `
        <HeaderPageAtom />
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const HeaderPageAtom = (args: ComponentPropsType) => ({
    components: { HeaderPageAtomComponent },
    setup() {
      return { args };
    },
    template: `
    <HeaderPageAtomComponent v-bind="args" />
    `,
});

HeaderPageAtom.args = {
  headerTitle: 'Lorem ipsum',
  headerDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet justo lacus. Aenean mi turpis, rutrum eget malesuada eu, fermentum a lectus. Sed pulvinar ante ut sapien rutrum ultricies vitae sit amet ipsum. '
}
