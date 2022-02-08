import {
  ref,
  Ref,
  PropType,
  reactive,
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
  };
}

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
    TimeElementWrapperAtom: defineAsyncComponent(() => import('@/atomic/atoms/TimeElementWrapperAtom/index.vue')),
    TextElementWrapperAtom: defineAsyncComponent(() => import('@/atomic/atoms/TextElementWrapperAtom/index.vue')),
    BooleanElementWrapperAtom: defineAsyncComponent(() => import('@/atomic/atoms/BooleanElementWrapperAtom/index.vue')),
  },

  props: {
    /**
     * Prop for columns table.
     */
    columnsTable: {
      type: Object as PropType<ColumnsTablePropsType>,
      default: [],
    },

    /**
     * Prop for data table.
     */
    dataTable: {
      type: Array as PropType<any>,
      default: [],
    },
  },

  /**
   * Main setup method for componenent.
   * @param Readonly<PropsComponentType> props
   * @returns Record<string, unknown>
   */
   setup(props: Readonly<PropsComponentType>, { emit }): Record<string, unknown> {
     /**
      * @var {Ref<string[]>}
      */
    const selectedRows: Ref<string[]> = ref<string[]>([]);

     /**
      * Function to assign dynamical property to colums.
      * @private
      * @returns {ColumnsTablePropsType}
      */
    function __assignDynamicalParamToColumns(): ColumnsTablePropsType {
      let parsed: ColumnsTablePropsType  = {};

      Object.keys(props.columnsTable).forEach(column => {
        parsed[column] = {
          ...props.columnsTable[column],
          isVisible: true,
        };
      });

      return parsed;
    }

    /**
     * @var {ColumnsTablePropsType}
     */
    const parsedColumnsTable: ColumnsTablePropsType = reactive<ColumnsTablePropsType>(__assignDynamicalParamToColumns());

    /**
     * Function to assign row to delete.
     * @param {Boolean} value
     * @param {String} uuid
     */
    function handleAssignRowToDelete(value: boolean, uuid: string) {
      if (value) {
        selectedRows.value.push(uuid);
      } else {
        selectedRows.value = selectedRows.value.filter(item => item !== uuid);
      }
    }

    /**
     * @var {TypesComponentColumsType}
     */
    const columnstType: TypesComponentColumsType = {
      text: defineAsyncComponent(() => import('@/atomic/atoms/TextElementWrapperAtom/index.vue')),
      time: defineAsyncComponent(() => import('@/atomic/atoms/TimeElementWrapperAtom/index.vue')),
      boolean: defineAsyncComponent(() => import('@/atomic/atoms/BooleanElementWrapperAtom/index.vue')),
    };

    /**
     * Function to handle dynamical component.
     * @param {String | Null} type
     * @returns 
     */
    function handleTypeOfColumn(type: string | null): any {
      return type ? columnstType[type] : columnstType['text'];
    }

    return  {
      selectedRows,
      parsedColumnsTable,
      handleTypeOfColumn,
      handleAssignRowToDelete,
    };
   },
});
