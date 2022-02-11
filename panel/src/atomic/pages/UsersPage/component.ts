import {
  defineComponent,
  defineAsyncComponent,
} from 'vue';

/**
 * Users
 * Component page users.
 */
export default defineComponent({
  name: 'UsersdPage',

  components: {
    MenuMolecule: defineAsyncComponent(() => import('@/atomic/molecules/MenuMolecule/index.vue')),
    HeaderPageAtom: defineAsyncComponent(() => import('@/atomic/atoms/HeaderPageAtom/index.vue')),
    PanelTemplate: defineAsyncComponent(() => import('@/atomic/templates/PanelTemplate/index.vue')),
    UsersListOrganism: defineAsyncComponent(() => import('@/atomic/organisms/UsersListOrganism/index.vue')),
    UserLoggedOrganism: defineAsyncComponent(() => import('@/atomic/organisms/UserLoggedOrganism/index.vue')),
  },
});
