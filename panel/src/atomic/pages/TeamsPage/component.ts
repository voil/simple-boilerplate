import {
  defineComponent,
  defineAsyncComponent,
} from 'vue';

/**
 * Teams
 * Component page teams.
 */
export default defineComponent({
  name: 'TeamsPage',

  components: {
    MenuMolecule: defineAsyncComponent(() => import('@/atomic/molecules/MenuMolecule/index.vue')),
    HeaderPageAtom: defineAsyncComponent(() => import('@/atomic/atoms/HeaderPageAtom/index.vue')),
    PanelTemplate: defineAsyncComponent(() => import('@/atomic/templates/PanelTemplate/index.vue')),
    UserLoggedOrganism: defineAsyncComponent(() => import('@/atomic/organisms/UserLoggedOrganism/index.vue')),
  },
});
