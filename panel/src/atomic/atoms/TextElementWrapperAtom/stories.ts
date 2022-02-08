import TextElementWrapperAtomComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {};

/**
 * Export default component.
 */
export default {
  component: TextElementWrapperAtomComponent,
  title: 'UI/Atoms/Text Element Wrapper Atom',
  parameters: {
    docs: {
      description: {
        component: 'Text element wrapper atom component.',
      },
      source: {
        code: `
        <TextElementWrapperAtom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque suscipit hendrerit. Suspendisse massa nisl, commodo ut
        </TextElementWrapperAtom>
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const TextElementWrapperAtom = (args: ComponentPropsType) => ({
    components: { TextElementWrapperAtomComponent },
    setup() {
      return { args };
    },
    template: `
    <TextElementWrapperAtomComponent v-bind="args">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque suscipit hendrerit. Suspendisse massa nisl, commodo ut
    </TextElementWrapperAtomComponent>
    `,
});