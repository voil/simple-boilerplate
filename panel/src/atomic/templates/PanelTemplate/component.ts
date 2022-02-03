import {
  defineComponent,
  defineAsyncComponent,
} from 'vue';

/**
 * PanelTemplate
 * Component template panel.
 *
 * @author Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
 */
export default defineComponent({
  name: 'PanelTemplate',

  components: {
    LogoAtom: defineAsyncComponent(() => import('@/atomic/atoms/LogoAtom/index.vue')),
  },
});
