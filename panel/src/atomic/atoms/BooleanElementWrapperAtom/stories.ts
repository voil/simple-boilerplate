import BooleanElementWrapperAtomComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {};

/**
 * Export default component.
 */
export default {
  component: BooleanElementWrapperAtomComponent,
  title: 'UI/Atoms/Boolean Element Wrapper Atom',
  parameters: {
    docs: {
      description: {
        component: 'Time element wrapper atom component.',
      },
      source: {
        code: `
        <BooleanElementWrapperAtom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque suscipit hendrerit. Suspendisse massa nisl, commodo ut
        </BooleanElementWrapperAtom>
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const BooleanElementWrapperAtom = (args: ComponentPropsType) => ({
    components: { BooleanElementWrapperAtomComponent },
    setup() {
      return { args };
    },
    template: `
    <BooleanElementWrapperAtomComponent v-bind="args">
      true
    </BooleanElementWrapperAtomComponent>
    `,
});