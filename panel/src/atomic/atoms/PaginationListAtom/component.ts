import {
  ref,
  Ref,
  defineComponent,
} from 'vue';

/**
 * @type PropsComponentType
 */
type PropsComponentType = {
  pageSize: number;
  currentPage: number;
  totalCount: number;
}

/**
 * PaginationListAtom
 * Component atom pagination list.
 */
export default defineComponent({
  name: 'PaginationListAtom',

  props: {
    /**
     * Prop for current page.
     */
    currentPage: {
      type: Number,
      default: 1,
      required: true,
    },

    /**
     * Prop for total count list.
     */
    totalCount: {
      type: Number,
      default: 0,
      required: true,
    },

    /**
     * Prop for page size.
     */
    pageSize: {
      type: Number,
      default: 25,
    },
  },

  emits: ['handleChangePage'],

  /**
   * Main setup method for componenent.
   * @returns Record<string, unknown>
   */
  setup(props: Readonly<PropsComponentType>, { emit }): Record<string, unknown> {
    const countOfPages: Ref<number> = ref<number>(Math.ceil(props.totalCount / props.pageSize));

    /**
     * Function to handle change list size.
     * @param {Number} size
     */
    function handleChangePage(current: number): void {
      emit('handleChangePage', current);
    }

    return {
      countOfPages,
      handleChangePage,
    };
  },
});
