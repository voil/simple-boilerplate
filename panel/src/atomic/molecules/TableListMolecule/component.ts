import {
  reactive,
  PropType,
  computed,
  ComputedRef,
  defineComponent,
  defineAsyncComponent,
} from 'vue';

type TypesComponentColumsType = {
  [key: string]: any;
}

export type ColumnsTablePropsType = {
  [key: string]: {
    width: number;
    label: string;
    type?: string;
    isVisible?: boolean;
    canSorting?: boolean | string;
  };
}

/**
 * @var {SortingType}
 */
type SortingType = {
  [none: string]: string,
  desc: string,
  asc: string,
};

/**
 * @type PropsComponentType
 */
type PropsComponentType = {
  columnsTable: ColumnsTablePropsType;
  dataTable: any[];
}

/**
 * TabbleList Molecule
 * Component molecule table list.
 */
export default defineComponent({
  name: 'TableListMolecule',

  components: {
    LinkAtom: defineAsyncComponent(() => import('@/atomic/atoms/LinkAtom/index.vue')),
    IconAtom: defineAsyncComponent(() => import('@/atomic/atoms/IconAtom/index.vue')),
    ButtonAtom: defineAsyncComponent(() => import('@/atomic/atoms/ButtonAtom/index.vue')),
    DividerAtom: defineAsyncComponent(() => import('@/atomic/atoms/DividerAtom/index.vue')),
    CheckboxAtom: defineAsyncComponent(() => import('@/atomic/atoms/CheckboxAtom/index.vue')),
    DropdownAtom: defineAsyncComponent(() => import('@/atomic/atoms/DropdownAtom/index.vue')),
  },

  props: {
    /**
     * Prop for columns table.
     */
    columnsTable: {
      type: Object as PropType<ColumnsTablePropsType>,
      default: () => ({}),
    },

    /**
     * Prop for data table.
     */
    dataTable: {
      type: Array as PropType<any>,
      default: () => ([]),
    },
  },

  emits: [
    'handleSortList',
    'handleDeleteElements',
  ],

  /**
   * Main setup method for componenent.
   * @param Readonly<PropsComponentType> props
   * @returns Record<string, unknown>
   */
  setup(props: Readonly<PropsComponentType>, { emit }): Record<string, unknown> {
    /**
     * @var {SortingType}
     */
    const typeSorting: SortingType = {
      none: 'desc',
      desc: 'asc',
      asc: 'none',
    };

    /**
     * Computed property get selected row for deleted.
     * @var {ComputedRef<string[]>}
     */
    const selectedRows: ComputedRef<string[]> = computed(() => props.dataTable
      .filter((row) => row.selected)
      .map((row) => row.uuid));

    /**
     * Function to assign dynamical property to colums.
     * @private
     * @returns {ColumnsTablePropsType}
     */
    function assignDynamicalParamToColumns(): ColumnsTablePropsType {
      const parsed: ColumnsTablePropsType = {};

      Object.keys(props.columnsTable).forEach((column: string) => {
        parsed[column] = Object.assign({
          ...props.columnsTable[column],
          isVisible: true,
        }, props.columnsTable[column]?.canSorting ? {
          canSorting: 'none',
        } : {});
      });

      return parsed;
    }

    /**
     * @var {ColumnsTablePropsType}
     */
    const parsedColumnsTable: ColumnsTablePropsType = reactive<ColumnsTablePropsType>(
      assignDynamicalParamToColumns(),
    );

    /**
     * @var {TypesComponentColumsType}
     */
    const columnstType: TypesComponentColumsType = {
      text: defineAsyncComponent(() => import('@/atomic/atoms/TextElementWrapperAtom/index.vue')),
      time: defineAsyncComponent(() => import('@/atomic/atoms/TimeElementWrapperAtom/index.vue')),
      boolean: defineAsyncComponent(() => import('@/atomic/atoms/BooleanElementWrapperAtom/index.vue')),
    };

    /**
     * Function handle sort by current column.
     * @param {String} columnKey
     */
    function handleSortColumn(columnKey: string): void {
      Object.keys(parsedColumnsTable).forEach((index: string) => {
        if (parsedColumnsTable[index].canSorting && index !== columnKey) {
          parsedColumnsTable[index].canSorting = 'none';
        }
      });

      parsedColumnsTable[columnKey].canSorting = typeSorting[parsedColumnsTable[columnKey]
        .canSorting as string];

      emit('handleSortList', {
        field: columnKey,
        type: parsedColumnsTable[columnKey].canSorting?.toString().toUpperCase(),
      });
    }

    /**
     * Function to handle dynamical component.
     * @param {String | Null} type
     * @returns
     */
    function handleTypeOfColumn(type: string | null): any {
      return type ? columnstType[type] : columnstType.text;
    }

    return {
      selectedRows,
      handleSortColumn,
      parsedColumnsTable,
      handleTypeOfColumn,
    };
  },
});
