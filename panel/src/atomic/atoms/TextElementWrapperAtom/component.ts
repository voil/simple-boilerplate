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
 * TextElementWrapperAtom
 * Component atom text element wrapper.
 */
export default defineComponent({
  name: 'TextElementWrapperAtom',

  props: {
    /**
     * Props for columns params.
     */
    paramsColumn: {
      type: Object as PropType<ParamsColumnType>,
      default: () => ({}),
    },
  },

  /**
   * Main setup method for componenent.
   * @param Readonly<PropsComponentType> props
   * @returns Record<string, unknown>
   */
  setup(props: Readonly<PropsComponentType>, { slots }): Record<string, unknown> {
    /**
     * @var {Number}
     */
    const breakpointText = 38;

    return {
      breakpointText,
    };
  },
});
