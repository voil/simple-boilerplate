import {
  defineComponent,
} from 'vue';

/**
 * Logo
 * Component atom logo.
 *

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
