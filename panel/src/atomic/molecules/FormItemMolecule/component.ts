import {
  defineComponent,
} from 'vue';

/**
 * Form item
 * Component molecule form item.
 *

 */
export default defineComponent({
  name: 'FormItemMolecule',

  props: {
    /**
     * Prop for label form item.
     */
    label: {
      type: String,
      default: null,
    },

    /**
     * Prop for messge error.
     */
    errorMessage: {
      type: String,
      default: null,
    },
  },
});
