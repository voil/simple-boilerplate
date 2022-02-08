import {
  computed,
  ComputedRef,
  defineComponent,
} from 'vue';

type PropsComponentType = {}

/**
 * BooleanElementWrapperAtom
 * Component atom boolean element wrapper.
 */
export default defineComponent({
  name: 'BooleanElementWrapperAtom',

  /**
   * Main setup method for componenent.
   * @param Readonly<PropsComponentType> props
   * @returns Record<string, unknown>
   */
   setup(props: Readonly<PropsComponentType>, { slots }): Record<string, unknown> {
    /**
     * @vat {ComputedRef<string | null | undefined>}
     */
    const typeOfBoolean: ComputedRef<boolean | null | undefined> = computed(() => slots.default
      ? (slots.default()[0]?.children?.toString().trim() === 'false' ? false : true) : null);

    return {
      typeOfBoolean,
    };
   }
});
