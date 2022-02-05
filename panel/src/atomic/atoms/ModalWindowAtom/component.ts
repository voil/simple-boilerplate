import {
  defineComponent,
} from 'vue';

/**
 * Modal window
 * Component atom modal window.
 *

 */
export default defineComponent({
  name: 'ModalWindowAtom',

  props: {
    /**
     * Prop for title modal window.
     */
    modalTitle: {
      type: String,
      default: null,
    },

    /**
     * Prop for description modal window.
     */
    modalDescription: {
      type: String,
      default: null,
    },
  },
});
