import {
  ref,
  Ref,
  computed,
  ComputedRef,
  defineComponent,
  defineAsyncComponent,
  PropType,
} from 'vue';
import Store from '@/composable/store';
import { PayloadStoreType } from '@/composable/store/store';
import { UserType } from '@/composable/store/modules/userStore';
import LoggedUserStateMachine from '@/composable/store/machines/authorization/loggedUserStateMachine';

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
    PopoverConfirmMolecule: defineAsyncComponent(() => import('@/atomic/molecules/PopoverConfirmMolecule/index.vue')),
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
    /**
     * Computed property for get user params.
     */
    const userLogged: ComputedRef<PayloadStoreType<UserType> | null> = computed(() => Store.get<UserType>('user'));

    /**
     * @var {Ref<boolean>}
     */
    const isPopoverConfirmVisible: Ref<boolean> = ref<boolean>(false);

    /**
     * Function to handle click element menu.
     * @param {String} menuElement
     */
    function handleClickElementMenu(menuElement: string) {
      switch (menuElement) {
        case 'logout': {
          isPopoverConfirmVisible.value = true;
        } break;
        case 'profile': {
          // ...
        } break;
        default: break;
      }
    }

    /**
     * Function to handle confirm logout from platform.
     */
    async function handleConfirmAction(): Promise<void> {
      isPopoverConfirmVisible.value = false;
      LoggedUserStateMachine.setState('pendingLogout');
    }

    return {
      userLogged,
      handleConfirmAction,
      handleClickElementMenu,
      isPopoverConfirmVisible,
    };
  },
});
