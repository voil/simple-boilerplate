import TagAtomComponent from './index.vue';

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
  tagType: string;
};

/**
 * Export default component.
 */
export default {
  component: TagAtomComponent,
  title: 'UI/Atoms/Tag Atom',
  argTypes: {
    tagType: {
      name: 'tagType',
      description: 'Prop for type component.',
      options: TypesArray,
      control: { type: 'select' }
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Tag component.',
      },
      source: {
        code: '<TagAtom />',
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const TagAtom = (args: ComponentPropsType) => ({
    components: { TagAtomComponent },
    setup() {
      return { args };
    },
    template: '<TagAtomComponent v-bind="args" />',
});

/**
 * Aassign defualt arguments for controls.
 */
TagAtom.args = {
  tagType: 'default',
}; 