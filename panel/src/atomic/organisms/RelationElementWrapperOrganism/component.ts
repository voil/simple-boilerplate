import {
  PropType,
  computed,
  ComputedRef,
  defineComponent,
  defineAsyncComponent,
} from 'vue';

type RelationType = {
  uuid: string
}

/**
 * @var {ParamsColumnType}
 */
type ParamsColumnType = {
  slot: RelationType | RelationType[];
};

/**
 * @var {PropsComponentType}
 */
type PropsComponentType = {
  paramsColumn: ParamsColumnType;
};

/**
 * RelationElementWrapperOrganism
 * Component organism relation element wrapper.
 */
export default defineComponent({
  name: 'RelationElementWrapperOrganism',

  components: {
    TagAtom: defineAsyncComponent(() => import('@/atomic/atoms/TagAtom/index.vue')),
  },

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
  setup(props: Readonly<PropsComponentType>): Record<string, unknown> {
    /**
     * Computed property to parse uuid element to string[]
     * @var {ComputedRef<string[]>}
     */
    const itemsRelation: ComputedRef<string[]> = computed(() => Array.isArray(props
      .paramsColumn.slot)
      ? props.paramsColumn.slot.map((item: RelationType) => item.uuid)
      : [props.paramsColumn.slot.uuid]);

    return {
      itemsRelation,
    };
  },
});
