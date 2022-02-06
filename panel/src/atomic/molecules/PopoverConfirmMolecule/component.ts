import {
  defineComponent,
  defineAsyncComponent,
} from 'vue';

/**
 * Popover confirm.
 * Component molecule popover confirm.
 *

 */
export default defineComponent({
  name: 'PopoverConfirmMolecule',

  components: {
    ButtonAtom: defineAsyncComponent(() => import('@/atomic/atoms/ButtonAtom/index.vue')),
    ModalWindowAtom: defineAsyncComponent(() => import('@/atomic/atoms/ModalWindowAtom/index.vue')),
  },

  props: {
    /**
     * Prop for title popover.
     */
    popoverTitle: {
      type: String,
      default: null,
    },

    /**
     * Prop for description popover.
     */
    popoverDescription: {
      type: String,
      default: null,
    },
  },

  emits: [
    'handleCancelAction',
    'handleConfirmAction',
  ],
});
