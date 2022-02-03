import {
  defineComponent,
  defineAsyncComponent,
} from 'vue';

/**
 * Login
 * Component page login.
 *

 */
export default defineComponent({
  name: 'DashboardPage',

  components: {
    PanelTemplate: defineAsyncComponent(() => import('@/atomic/templates/PanelTemplate/index.vue')),
  },
});
