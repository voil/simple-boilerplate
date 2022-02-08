import TimeElementWrapperAtomComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {};

/**
 * Export default component.
 */
export default {
  component: TimeElementWrapperAtomComponent,
  title: 'UI/Atoms/Time Element Wrapper Atom',
  parameters: {
    docs: {
      description: {
        component: 'Time element wrapper atom component.',
      },
      source: {
        code: `
        <TimeElementWrapperAtom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque suscipit hendrerit. Suspendisse massa nisl, commodo ut
        </TimeElementWrapperAtom>
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const TimeElementWrapperAtom = (args: ComponentPropsType) => ({
    components: { TimeElementWrapperAtomComponent },
    setup() {
      return { args };
    },
    template: `
    <TimeElementWrapperAtomComponent v-bind="args">
      Lorem ipsum dolor sit amet
    </TimeElementWrapperAtomComponent>
    `,
});