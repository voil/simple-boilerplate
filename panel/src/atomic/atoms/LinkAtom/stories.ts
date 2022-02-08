import LinkAtomComponent from './index.vue';

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
  linkType: string;
};


/**
 * Export default component.
 */
export default {
  component: LinkAtomComponent,
  title: 'UI/Atoms/Link Atom',
  argTypes: {
    linkType: {
      name: 'linkType',
      description: 'Prop for type of link.',
      options: TypesArray,
      control: { type: 'select' }
    },
  },
  parameters: {
    jest: ['linkAtom.spec.ts'],
    docs: {
      description: {
        component: 'Link atom component.',
      },
      source: {
        code: `
        <LinkAtom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque suscipit hendrerit. Suspendisse massa nisl, commodo ut
        </LinkAtom>
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const LinkAtom = (args: ComponentPropsType) => ({
    components: { LinkAtomComponent },
    setup() {
      return { args };
    },
    template: `
    <LinkAtomComponent v-bind="args">
      Lorem ipsum dolor sit amet
    </LinkAtomComponent>
    `,
});

LinkAtom.args = {
  linkType: 'default',
}
