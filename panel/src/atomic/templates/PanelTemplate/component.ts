import {
  defineComponent,
  defineAsyncComponent,
} from 'vue';

/**
 * PanelTemplate
 * Component template panel.
 *

 */
export default defineComponent({
  name: 'PanelTemplate',

  components: {
    LogoAtom: defineAsyncComponent(() => import('@/atomic/atoms/LogoAtom/index.vue')),
  },
});
