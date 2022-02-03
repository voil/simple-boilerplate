import {
  computed,
  ComputedRef,
  defineComponent,
  defineAsyncComponent,
} from 'vue';
import Store from '@/composable/store';
import { PayloadStoreType } from '@/composable/store/store';
import { UserType } from '@/composable/store/modules/userStore';

/**
 * User Logged Organism
 * Component organism user logged.
 *

 */
export default defineComponent({
  name: 'UserLoggedOrganism',

  components: {
    DropdownAtom: defineAsyncComponent(() => import('@/atomic/atoms/DropdownAtom/index.vue')),
  },

  /**
   * Main setup method for componenent.
   * @returns Record<string, unknown>
   */
  setup(): Record<string, unknown> {
    const user: ComputedRef<PayloadStoreType<UserType> | null> = computed(() => Store.get<UserType>('user'));

    return {
      user,
    };
  },
});
