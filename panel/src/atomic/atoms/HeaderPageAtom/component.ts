import {
  defineComponent,
} from 'vue';

/**
 * Header
 * Component for header page.
 */
export default defineComponent({
  name: 'HeaderPageAtom',

  props: {
    /**
     * Prop for title header.
     * @type {String}
     */
    headerTitle: {
      type: String,
      default: null,
    },

    /**
     * Prop for description header.
     * @type {String}
     */
     headerDescription: {
      type: String,
      default: null,
    },
  },
});
