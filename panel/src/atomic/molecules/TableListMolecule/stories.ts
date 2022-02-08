import TableListMoleculeComponent from './index.vue';
import { ColumnsTablePropsType } from './component'; 

/**
 * @type ComponentPropsType
 */
type ComponentPropsType = {
  columnsTable: ColumnsTablePropsType;
};

/**
 * Export default component.
 */
export default {
  component: TableListMoleculeComponent,
  title: 'UI/Molecules/Table List Molecule',
  argTypes: {
    columnsTable: {
      name: 'columnsTable',
      decription: 'Prop for columns table.',
    },
    dataTable: {
      name: 'dataTable',
      description: 'Prop for data table.',
    },
  },
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

TableListMolecule.args = {
  columnsTable: {
    id: {
      label: 'ID',
      width: 50,
    },
    uuid: {
      label: 'UUID',
      width: 300,
    },
    name: {
      label: 'Name ad surname',
      width: 300,
    },
    switch: {
      label: 'Checked',
      type: 'boolean',
      width: 80,
    },
    created_at: {
      label: 'Created at',
      type: 'time',
      width: 300
    },
    updated_at: {
      label: 'Updated at',
      type: 'time',
      width: 300
    },
    test: {
      label: 'Test test',
      width: 300,
    },
  },
  dataTable: [{
    id: 1,
    uuid: '524cd750-880e-11ec-a8a3-0242ac120002',
    name: 'Jhon Doe',
    switch: true,
    created_at: '10-20-2022 10:11:12',
    updated_at: '13-20-2022 10:11:12',
    test: 'Lorem ipsum',
  },{
    id: 1,
    uuid: '524cd750-880e-11ec-a8a3-0242ac120002',
    name: 'Jhon Doe',
    switch: false,
    created_at: '10-20-2022 10:11:12',
    updated_at: '13-20-2022 10:11:12',
    test: 'Lorem ipsum',
  },{
    id: 1,
    uuid: '524cd750-880e-11ec-a8a3-0242ac120002',
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque suscipit hendrerit. Suspendisse massa nisl, commodo ut',
    switch: true,
    created_at: '10-20-2022 10:11:12',
    updated_at: '13-20-2022 10:11:12',
    test: 'Lorem ipsum',
  },{
    id: 1,
    uuid: '524cd750-880e-11ec-a8a3-0242ac120002',
    name: 'Jhon Doe',
    switch: true,
    created_at: '10-20-2022 10:11:12',
    updated_at: '13-20-2022 10:11:12',
    test: 'Lorem ipsum',
  },{
    id: 1,
    uuid: '524cd750-880e-11ec-a8a3-0242ac120002',
    name: 'Jhon Doe',
    switch: true,
    created_at: '10-20-2022 10:11:12',
    updated_at: '13-20-2022 10:11:12',
    test: 'Lorem ipsum',
  },{
    id: 1,
    uuid: '524cd750-880e-11ec-a8a3-0242ac120002',
    name: 'Jhon Doe',
    switch: false,
    created_at: '10-20-2022 10:11:12',
    updated_at: '13-20-2022 10:11:12',
    test: 'Lorem ipsum',
  },{
    id: 1,
    uuid: '524cd750-880e-11ec-a8a3-0242ac120002',
    name: 'Jhon Doe',
    switch: true,
    created_at: '10-20-2022 10:11:12',
    updated_at: '13-20-2022 10:11:12',
    test: 'Lorem ipsum',
  }],
};
