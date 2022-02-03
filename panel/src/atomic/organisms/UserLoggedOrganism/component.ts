import {
  computed,
  ComputedRef,
  defineComponent,
  defineAsyncComponent,
  PropType,
} from 'vue';
import Store from '@/composable/store';
import { PayloadStoreType } from '@/composable/store/store';
import { UserType } from '@/composable/store/modules/userStore';

/**
 * @var {OptionType}
 */
 type OptionType = {
  lable: string;
  icon?: string;
}

/**
 * @var {OptionsType}
 */
type OptionsType = {
  [key: string]: OptionType;
}

/**
 * User Logged Organism
 * Component organism user logged.
 */
export default defineComponent({
  name: 'UserLoggedOrganism',

  components: {
    DropdownAtom: defineAsyncComponent(() => import('@/atomic/atoms/DropdownAtom/index.vue')),
    MenuMolecule: defineAsyncComponent(() => import('@/atomic/molecules/MenuMolecule/index.vue')),
  },

  props: {
    /**
     * Props for menu.
     */
    menuOptions: {
      type: Object as PropType<OptionsType>,
      default: () => ({}),
    },
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
