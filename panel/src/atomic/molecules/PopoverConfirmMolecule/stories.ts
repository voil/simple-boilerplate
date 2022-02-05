import PopoverConfirmMoleculeComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
 type ComponentPropsType = {
  popoverTitle: string;
  popoverDescription: string;
};

/**
 * Export default component.
 */
export default {
  component: PopoverConfirmMoleculeComponent,
  title: 'UI/Molecules/Popover Confirm Molecule',
  argTypes: {
    popoverTitle: {
      name: 'popoverTitle',
      description: 'Prop for title.', 
    },
    popoverDescription: {
      name: 'popoverDescription',
      description: 'Prop for description.', 
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Component molecule popover confirm.',
      },
      source: {
        code: `
          <PopoverConfirmMolecule />
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const PopoverConfirmMolecule = (args: ComponentPropsType) => ({
    components: { PopoverConfirmMoleculeComponent },
    setup() {
      return { args };
    },
    template: `
      <PopoverConfirmMoleculeComponent v-bind="args" />
    `,
});

PopoverConfirmMolecule.args = {
  popoverTitle: 'Lorem ipsum',
  popoverDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet justo lacus. Aenean mi turpis, rutrum eget malesuada eu, fermentum a lectus. Sed pulvinar ante ut sapien rutrum ultricies vitae sit amet ipsum. '
}
