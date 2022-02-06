import {
  defineComponent,
  defineAsyncComponent,
} from 'vue';

/**
 * Dashboard page
 * Component page dashboard.
 *

 */
export default defineComponent({
  name: 'DashboardPage',

  components: {
    MenuMolecule: defineAsyncComponent(() => import('@/atomic/molecules/MenuMolecule/index.vue')),
    PanelTemplate: defineAsyncComponent(() => import('@/atomic/templates/PanelTemplate/index.vue')),
    UserLoggedOrganism: defineAsyncComponent(() => import('@/atomic/organisms/UserLoggedOrganism/index.vue')),
  },
});
