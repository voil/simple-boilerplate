import {
  defineComponent,
  defineAsyncComponent,
} from 'vue';

/**
 * Login
 * Component page login.
 *
 * @author Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
 */
export default defineComponent({
  name: 'DashboardPage',

  components: {
    PanelTemplate: defineAsyncComponent(() => import('@/atomic/templates/PanelTemplate/index.vue')),
  },
});
