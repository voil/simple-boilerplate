import {
  computed,
  ComputedRef,
  defineComponent,
} from 'vue';

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

  /**
   * Main setup method for componenent.
   * @param Readonly<PropsComponentType> props
   * @returns Record<string, unknown>
   */
   setup(props: Readonly<PropsComponentType>, { slots }): Record<string, unknown> {
    /**
     * @vat {ComputedRef<string | null | undefined>}
     */
    const textFromSlot: ComputedRef<string | null | undefined> = computed(() => slots.default
      ? slots.default()[0]?.children?.toString().trim() : null);

    /**
     * @var {Number}
     */
    const breakpointText: number = 38;

    return {
      textFromSlot,
      breakpointText,
    };
   }
});
