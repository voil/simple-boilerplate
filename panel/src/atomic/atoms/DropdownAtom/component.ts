import {
  ref,
  Ref,
  defineComponent,
} from 'vue';

/**
 * DropdownAtom
 * Component atom drop down.
 */
export default defineComponent({
  name: 'DropdownAtom',

  setup() {
    /**
     * @var {Ref<boolean>}
     */
    const isOverlayerVisible: Ref<boolean> = ref<boolean>(false);

    /**
     * Function to hide dropdown.
     */
    function handleHideDropdown(): void {
      setTimeout(() => {
        isOverlayerVisible.value = false;
      }, 100);
    }

    return {
      isOverlayerVisible,
      handleHideDropdown,
    };
  },
});
