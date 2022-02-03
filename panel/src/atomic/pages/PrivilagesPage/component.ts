import {
  defineComponent,
  defineAsyncComponent,
} from 'vue';

/**
 * Privilages
 * Component page privilages.
 */
export default defineComponent({
  name: 'PrivilagesPage',

  components: {
    MenuMolecule: defineAsyncComponent(() => import('@/atomic/molecules/MenuMolecule/index.vue')),
    PanelTemplate: defineAsyncComponent(() => import('@/atomic/templates/PanelTemplate/index.vue')),
    UserLoggedOrganism: defineAsyncComponent(() => import('@/atomic/organisms/UserLoggedOrganism/index.vue')),
  },
});
