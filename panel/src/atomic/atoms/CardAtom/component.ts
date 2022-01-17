import {
  defineComponent,
} from 'vue';

/**
 * Card
 * Component atom card.
 *
 * @author Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
 */
export default defineComponent({
  name: 'ButtonAtom',

  props: {
    /**
     * Prop for title card.
     */
    cardTitle: {
      type: String,
      default: null,
    },

    /**
     * Prop for description card.
     */
    cardDescription: {
      type: String,
      default: null,
    },

    /**
     * Prop for type of card.
     * @values info, error, warning, primary.
     */
    cardType: {
      type: String,
      default: 'primary',
      validator(prop: string): boolean {
        return [
          'info',
          'error',
          'default',
          'warning',
          'primary',
        ].includes(prop as string);
      },
    },
  },
});
