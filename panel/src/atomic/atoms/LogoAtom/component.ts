import {
  defineComponent,
} from 'vue';

/**
 * Logo
 * Component atom logo.
 *
 * @author Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
 */
export default defineComponent({
  name: 'LogoAtom',

  props: {
    /**
     * Prop for image.
     */
    image: {
      type: String,
      default: null,
    },
  },
});
