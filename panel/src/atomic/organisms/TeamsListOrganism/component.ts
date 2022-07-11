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
import { TeamsType } from '@/composable/store/modules/teamsStore';
import TeamsListStateMachine from '@/composable/store/machines/teamsListStateMachine';

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
  name: 'TeamsListOrganism',

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
    const curretntStateList: ComputedRef<string> = computed(() => TeamsListStateMachine
      .getCurrentState());

    /**
     * @var {ComputedRef<PayloadStoreType<UsersType> | null>}
     */
    const teamsListFromStore: ComputedRef<PayloadStoreType<TeamsType> | null> = computed(() => Store.get('teams'));

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
    const offset: ComputedRef<OffsetType> = computed(() => Store.get('teams')?.offset);

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
     * Function to get list.
     */
    function getTeamsList(): void {
      TeamsListStateMachine.setState('pending');
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
      Store.commit('teams', {
        order: order.type !== 'NONE' ? order : null,
      });

      getTeamsList();
    }

    /**
     * Function to change page list.
     * @param {Number} page
     */
    function handleChangePage(page: number): void {
      Store.commit('teams', {
        offset: {
          ...Store.get('teams')?.offset,
          page,
        },
      });
      getTeamsList();
    }

    /**
     * Function to handle change limit offset.
     * @param {Number} size
     */
    function handleChangeLimitOffsetList(size: number): void {
      Store.commit('teams', {
        offset: {
          page: 1,
          limit: size,
        },
      });
      getTeamsList();
    }

    /**
     * Function to handle confirm delete elements list.
     */
    async function handleConfirmDeleteAction(): Promise<void> {
      await TeamsListStateMachine.setState('pendingDelete', elementsToDelete.value);
      elementsToDelete.value = [];
      isPopoverConfirmVisible.value = false;
    }

    /**
     * Function fired when component mounted.
     */
    onMounted(() => getTeamsList());

    return {
      offset,
      columnsTable,
      handleSortList,
      handleChangePage,
      curretntStateList,
      teamsListFromStore,
      handleDeleteElements,
      isPopoverConfirmVisible,
      handleConfirmDeleteAction,
      handleChangeLimitOffsetList,
    };
  },
});
