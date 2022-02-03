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
    const isOverlayerVisible: Ref<boolean> = ref<boolean>(false);

    return {
      isOverlayerVisible,
    };
  },
});
