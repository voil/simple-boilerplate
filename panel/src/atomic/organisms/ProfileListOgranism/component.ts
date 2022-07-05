import {
  ref,
  Ref,
  computed,
  onMounted,
  ComputedRef,
  defineComponent,
  defineAsyncComponent,
} from 'vue';
import Store from '@/composable/store';
import { OffsetType, SortOrderType } from '@/utils/types';
import { PayloadStoreType } from '@/composable/store/store';
import { ProfilesType } from '@/composable/store/modules/profilesStore';
import ProfilesListStateMachine from '@/composable/store/machines/profilesListStateMachine';

type ColumnsTablePropsType = {
  [key: string]: {
    width: number;
    label: string;
    type?: string;
    isVisible?: boolean;
    canSorting?: boolean;
  };
}

/**
 * Profiles List Organism
 * Component organism profiles list.
 */
export default defineComponent({
  name: 'ProfilesListOrganism',

  components: {
    SpinnerAtom: defineAsyncComponent(() => import('@/atomic/atoms/SpinnerAtom/index.vue')),
    PageListSizerAtom: defineAsyncComponent(() => import('@/atomic/atoms/PageListSizerAtom/index.vue')),
    PaginationListAtom: defineAsyncComponent(() => import('@/atomic/atoms/PaginationListAtom/index.vue')),
    TableListMolecule: defineAsyncComponent(() => import('@/atomic/molecules/TableListMolecule/index.vue')),
    PopoverConfirmMolecule: defineAsyncComponent(() => import('@/atomic/molecules/PopoverConfirmMolecule/index.vue')),
  },

  /**
   * Main setup method for componenent.
   * @returns Record<string, unknown>
   */
  setup(): Record<string, unknown> {
    /**
     * Computed property to get state of form machine.
     * @var {ComputedRef<string>}
     */
    const curretntStateList: ComputedRef<string> = computed(() => ProfilesListStateMachine
      .getCurrentState());

    /**
     * @var {ComputedRef<PayloadStoreType<UsersType> | null>}
     */
    const profilesListFromStore: ComputedRef<PayloadStoreType<ProfilesType> | null> = computed(() => Store.get('profiles'));

    /**
     * @var {Ref<boolean>}
     */
    const isPopoverConfirmVisible: Ref<boolean> = ref<boolean>(false);

    /**
     * @var {Ref<string[]>}
     */
    const elementsToDelete: Ref<string[]> = ref<string[]>([]);

    /**
     * @var {ComputedRef<OffsetType>}
     */
    const offset: ComputedRef<OffsetType> = computed(() => Store.get('profiles')?.offset);

    /**
     * @var {ColumnsTablePropsType}
     */
    const columnsTable: ColumnsTablePropsType = {
      uuid: {
        label: 'UUID',
        width: 320,
      },
      name: {
        label: 'Name',
        width: 100,
        canSorting: true,
      },
      description: {
        label: 'Description',
        width: 300,
      },
      label: {
        label: 'Label',
        width: 100,
      },
      is_active: {
        label: 'Is active',
        width: 70,
        type: 'boolean',
      },
      created_at: {
        label: 'Created at',
        width: 200,
        type: 'time',
        canSorting: true,
      },
      updated_at: {
        label: 'Updated at',
        width: 200,
        type: 'time',
        canSorting: true,
      },
    };

    /**
     * Function to get profiles list.
     */
    function getProfilesList(): void {
      ProfilesListStateMachine.setState('pending');
    }

    /**
     * Function to handle remove elements.
     * @param {String[]} elements
     */
    function handleDeleteElements(elements: string[]): void {
      isPopoverConfirmVisible.value = true;
      elementsToDelete.value = [...elements];
    }

    /**
     * Function to order list by current column.
     * @param {SortOrderType} order
     */
    function handleSortList(order: SortOrderType): void {
      Store.commit('profiles', {
        order: order.type !== 'NONE' ? order : null,
      });

      getProfilesList();
    }

    /**
     * Function to change page list.
     * @param {Number} page
     */
    function handleChangePage(page: number): void {
      Store.commit('profiles', {
        offset: {
          ...Store.get('profiles')?.offset,
          page,
        },
      });
      getProfilesList();
    }

    /**
     * Function to handle change limit offset.
     * @param {Number} size
     */
    function handleChangeLimitOffsetList(size: number): void {
      Store.commit('profiles', {
        offset: {
          page: 1,
          limit: size,
        },
      });
      getProfilesList();
    }

    /**
     * Function to handle confirm delete elements list.
     */
    async function handleConfirmDeleteAction(): Promise<void> {
      await ProfilesListStateMachine.setState('pendingDelete', elementsToDelete.value);
      elementsToDelete.value = [];
      isPopoverConfirmVisible.value = false;
    }

    /**
     * Function fired when component mounted.
     */
    onMounted(() => getProfilesList());

    return {
      offset,
      columnsTable,
      handleSortList,
      handleChangePage,
      curretntStateList,
      handleDeleteElements,
      profilesListFromStore,
      isPopoverConfirmVisible,
      handleConfirmDeleteAction,
      handleChangeLimitOffsetList,
    };
  },
});
