import CardAtomComponent from './index.vue';

/**
 * @const string[]
 */
 const TypesArray: string[] = [
  'info',
  'error',
  'default',
  'warning',
  'primary',
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
  component: CardAtomComponent,
  title: 'UI/Atoms/Card Atom',
  argTypes: {
    cardTitle: {
      name: 'cardTitle',
      description: 'Prop for title card.', 
    },
    cardDescription: {
      name: 'cardDescription',
      description: 'Prop for descrption card.', 
    },
    cardType: {
      name: 'cardType',
      description: 'Prop for type of card.',
      options: TypesArray,
      control: { type: 'select' }
    },
  },
  parameters: {
    jest: ['cardAtom.spec.ts'],
    docs: {
      description: {
        component: 'Card atom component.',
      },
      source: {
        code: `
        <CardAtom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque suscipit hendrerit. Suspendisse massa nisl, commodo ut
        </CardAtom>
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const CardAtom = (args: ComponentPropsType) => ({
    components: { CardAtomComponent },
    setup() {
      return { args };
    },
    template: `
    <CardAtomComponent v-bind="args">
      Lorem ipsum dolor sit amet
    </CardAtomComponent>
    `,
});

CardAtom.args = {
  cardType: 'primary',
  cardTitle: 'Lorem ipsum',
  cardDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet justo lacus. Aenean mi turpis, rutrum eget malesuada eu, fermentum a lectus. Sed pulvinar ante ut sapien rutrum ultricies vitae sit amet ipsum. '
}
