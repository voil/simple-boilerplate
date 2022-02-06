import {
  defineComponent,
} from 'vue';

/**
 * Alert
 * Component atom alert.
 *

 */
export default defineComponent({
  name: 'AlertAtom',

  props: {
    /**
     * Prop for title card.
     */
    alertTitle: {
      type: String,
      default: null,
    },

    /**
     * Prop for description card.
     */
    alertDescription: {
      type: String,
      default: null,
    },

    /**
     * Prop for type of alert.
     * @values info, error, warning, success.
     */
    alertType: {
      type: String,
      default: 'success',
      validator(prop: string): boolean {
        return [
          'info',
          'error',
          'warning',
          'success',
        ].includes(prop as string);
      },
    },
  },
});
