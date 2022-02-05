import ModalWindowAtomComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {
  modalTitle: string;
  modalDescription: string;
};


/**
 * Export default component.
 */
export default {
  component: ModalWindowAtomComponent,
  title: 'UI/Atoms/Modal Window Atom',
  argTypes: {
    modalTitle: {
      name: 'modalTitle',
      description: 'Prop for title modal window atom.', 
    },
    modalDescription: {
      name: 'modalDescription',
      description: 'Prop for description modal window atom.', 
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Modal window atom component.',
      },
      source: {
        code: `
        <ModalWindowAtom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque suscipit hendrerit. Suspendisse massa nisl, commodo ut
        </ModalWindowAtom>
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const ModalWindowAtom = (args: ComponentPropsType) => ({
    components: { ModalWindowAtomComponent },
    setup() {
      return { args };
    },
    template: `
    <ModalWindowAtomComponent v-bind="args">
      Lorem ipsum dolor sit amet
    </ModalWindowAtomComponent>
    `,
});

ModalWindowAtom.args = {
  modalTitle: 'Lorem ipsum',
  modalDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet justo lacus. Aenean mi turpis, rutrum eget malesuada eu, fermentum a lectus. Sed pulvinar ante ut sapien rutrum ultricies vitae sit amet ipsum. '
}
