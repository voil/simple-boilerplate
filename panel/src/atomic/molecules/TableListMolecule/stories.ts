import TableListMoleculeComponent from './index.vue';

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {};


/**
 * Export default component.
 */
export default {
  component: TableListMoleculeComponent,
  title: 'UI/Molecules/Table List Molecule',
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'Table list molecule component.',
      },
      source: {
        code: `
          <TableListMolecule options="{}" />
        `,
      },
    },
  },
};

/**
 * Export storie for component.
 */
export const TableListMolecule = (args: ComponentPropsType) => ({
    components: { TableListMoleculeComponent },
    setup() {
      return { args };
    },
    template: `
      <TableListMoleculeComponent v-bind="args" />
    `,
});

TableListMolecule.args = {};
