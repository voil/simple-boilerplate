import TeamsListOgranismComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = { };

/**
 * Export default component.
 */
export default {
  component: TeamsListOgranismComponent,
  title: 'UI/Organisms/Teams List Organism',
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'Teams list organism component.',
      },
      source: {
        code: `
          <TeamsListOgranism />
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const TeamsListOrganism = (args: ComponentPropsType) => ({
    components: { TeamsListOgranismComponent },
    setup() {
      return { args };
    },
    template: `
      <TeamsListOgranismComponent v-bind="args" />
    `,
});

TeamsListOrganism.args = {};