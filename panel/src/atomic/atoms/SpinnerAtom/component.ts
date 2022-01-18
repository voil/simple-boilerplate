import {
  defineComponent,
} from 'vue';

/**
 * Spinner
 * Component atom spinner.
 *
 * @author Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
 */
export default defineComponent({
  name: 'SpinnerAtom',

  props: {
    /**
     * Prop for message spinner.
     */
    message: {
      type: String,
      default: null,
    },
  },
});
