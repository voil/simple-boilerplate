import PanelTemplateComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {};

/**
 * Export default component.
 */
export default {
  component: PanelTemplateComponent,
  title: 'UI/Templates/Panel Template',
  argTypes: {
    title: {
      name: 'title',
      description: 'Prop for title.', 
    },
    description: {
      name: 'description',
      description: 'Prop for descrption.', 
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'Authentication template component.',
      },
      source: {
        code: `
          <PanelTemplate />
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const PanelTemplate = (args: ComponentPropsType) => ({
    components: { PanelTemplateComponent },
    setup() {
      return { args };
    },
    template: `
      <PanelTemplateComponent v-bind="args">Content</PanelTemplateComponent>
    `,
});
