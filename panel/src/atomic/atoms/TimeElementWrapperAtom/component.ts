import {
  PropType,
  defineComponent,
} from 'vue';

/**
 * @var {ParamsColumnType}
 */
type ParamsColumnType = {
  slot: string;
};

/**
 * @var {PropsComponentType}
 */
 type PropsComponentType = {};

/**
 * TimeElementWrapperAtom
 * Component atom time element wrapper.
 */
export default defineComponent({
  name: 'TimeElementWrapperAtom',

  props: {
    /**
     * Props for columns params.
     */
    paramsColumn: {
      type: Object as PropType<ParamsColumnType>,
      default: () => ({}),
    },
  },
});
