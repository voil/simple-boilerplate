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

  props: {
    /**
     * Prop for position of overlayer
     * @type {String}
     * @values left, right.
     */
    positionOverlayer: {
      type: String,
      default: 'left',
      validator(prop: string): boolean {
        return ['left', 'right'].includes(prop);
      },
    },

    /**
     * Prop for handle hide on click.
     */
    hideOnClick: {
      type: Boolean,
      default: true,
    },
  },

  /**
   * Main setup method for componenent.
   * @returns Record<string, unknown>
   */
  setup(): Record<string, unknown> {
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
