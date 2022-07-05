import {
  defineComponent,
  defineAsyncComponent,
} from 'vue';

/**
 * Profiles
 * Component page profiles.
 */
export default defineComponent({
  name: 'ProfilesPage',

  components: {
    MenuMolecule: defineAsyncComponent(() => import('@/atomic/molecules/MenuMolecule/index.vue')),
    HeaderPageAtom: defineAsyncComponent(() => import('@/atomic/atoms/HeaderPageAtom/index.vue')),
    PanelTemplate: defineAsyncComponent(() => import('@/atomic/templates/PanelTemplate/index.vue')),
    UserLoggedOrganism: defineAsyncComponent(() => import('@/atomic/organisms/UserLoggedOrganism/index.vue')),
    ProfilesListOrganism: defineAsyncComponent(() => import('@/atomic/organisms/ProfileListOgranism/index.vue')),
  },
});
