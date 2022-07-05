import {
  PropType,
  defineComponent,
} from 'vue';

/**
 * @var {ParamsColumnType}
 */
type ParamsColumnType = {
  slot: boolean;
};

type PropsComponentType = {}

/**
 * BooleanElementWrapperAtom
 * Component atom boolean element wrapper.
 */
export default defineComponent({
  name: 'BooleanElementWrapperAtom',

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
