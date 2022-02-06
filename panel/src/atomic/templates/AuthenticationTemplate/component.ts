import {
  defineComponent,
  defineAsyncComponent,
} from 'vue';

/**
 * Authentication
 * Component template authentication.
 *

 */
export default defineComponent({
  name: 'AuthenticationTemplate',

  components: {
    CardAtom: defineAsyncComponent(() => import('@/atomic/atoms/CardAtom/index.vue')),
    LogoAtom: defineAsyncComponent(() => import('@/atomic/atoms/LogoAtom/index.vue')),
  },

  props: {
    /**
     * Prop for title.
     */
    title: {
      type: String,
      default: null,
    },

    /**
     * Prop for description.
     */
    description: {
      type: String,
      default: null,
    },
  },
});
