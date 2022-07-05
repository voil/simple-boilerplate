import {
  ref,
  Ref,
  PropType,
  defineComponent,
} from 'vue';

/**
 * @type PropsComponentType
 */
type PropsComponentType = {
  optionsSizer: number[];
}

/**
 * PageListSizer
 * Component atom page list size.
 */
export default defineComponent({
  name: 'PageListSizer',

  props: {
    /**
     * Prop for options page size.
     */
    optionsSizer: {
      type: Array as PropType<number[]>,
      default: () => ([10, 25, 50, 100]),
      validator(prop: number[]): boolean {
        const exist = prop.find((size: number) => !Number.isInteger(size));
        return !exist;
      },
    },
  },

  emits: ['handleChangeSizeList'],

  /**
   * Main setup method for componenent.
   * @returns Record<string, unknown>
   */
  setup(props: Readonly<PropsComponentType>, { emit }): Record<string, unknown> {
    /**
     * @var {Ref<number>}
     */
    const currentSize: Ref<number> = ref<number>(25);

    /**
     * Function to handle change list size.
     * @param {Number} size
     */
    function handleChangeListSize(size: number): void {
      emit('handleChangeSizeList', size);
      currentSize.value = size;
    }

    return {
      currentSize,
      handleChangeListSize,
    };
  },
});
