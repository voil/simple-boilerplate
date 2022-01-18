import IconAtomComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {
  name: string;
  color: string;
};

/**
 * @const string[]
 */
 const AvalibleIcons: string[] = ICONS_LIST;

/**
 * Export default component.
 */
export default {
  component: IconAtomComponent,
  title: 'UI/Atoms/Icon Atom',
  argTypes: {
    name: {
      name: 'name',
      default: 'success',
      description: 'Prop for name of icon.',
      options: AvalibleIcons,
      control: { type: 'select' }
    },
    color: {
      name: 'color',
      description: 'Prop for color icon.',
      control: { type: 'color' }
    },
  },
  parameters: {
    jest: ['iconAtom.spec.ts'],
    docs: {
      description: {
        component: 'Icon component.',
      },
      source: {
        code: '<IconAtom name="success" />',
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const IconAtom = (args: ComponentPropsType) => ({
    components: { IconAtomComponent },
    setup() {
      return { args };
    },
    template: '<IconAtomComponent v-bind="args" />',
});

/**
 * Aassign defualt arguments for controls.
 */
IconAtom.args = {
  color: '#E67E22',
  name: 'success',
};