import {
  computed,
  reactive,
  onMounted,
  ComputedRef,
  defineComponent,
  defineAsyncComponent,
} from 'vue';
import Store from '@/composable/store';
import { OffsetType, SortOrderType } from '@/utils/types';
import { PayloadStoreType } from '@/composable/store/store';
import { UsersType } from '@/composable/store/modules/usersStore';
import UserListStateMachines, { UserListParamsType } from '@/composable/store/machines/users/userListStateMachines';

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
 * User List Organism
 * Component organism user list.
 */
export default defineComponent({
  name: 'UsersListOrganism',

  components: {
    SpinnerAtom: defineAsyncComponent(() => import('@/atomic/atoms/SpinnerAtom/index.vue')),
    PageListSizerAtom: defineAsyncComponent(() => import('@/atomic/atoms/PageListSizerAtom/index.vue')),
    PaginationListAtom: defineAsyncComponent(() => import('@/atomic/atoms/PaginationListAtom/index.vue')),
    TableListMolecule: defineAsyncComponent(() => import('@/atomic/molecules/TableListMolecule/index.vue')),
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
    const curretntStateList: ComputedRef<string> = computed(() => UserListStateMachines
      .getCurrentState());

    /**
     * @var {ComputedRef<PayloadStoreType<UsersType> | null>}
     */
    const usersListFromStore: ComputedRef<PayloadStoreType<UsersType> | null> = computed(() => Store.get('users'));

    /**
     * @var {OffsetType}
     */
    const offset: OffsetType = reactive<OffsetType>({
      page: 1,
      limit: 25,
    });

    /**
     * @var {ColumnsTablePropsType}
     */
    const columnsTable: ColumnsTablePropsType = {
      uuid: {
        label: 'UUID',
        width: 320,
      },
      name_and_surname: {
        label: 'Name and suername',
        width: 300,
        canSorting: true,
      },
      email: {
        label: 'E-mail',
        width: 250,
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
     * Function to get user list.
     */
    function getUserList(): void {
      UserListStateMachines.setState('pending', {
        offset: {
          ...offset,
          limit: `L${offset.limit}`,
        },
      });
    }

    /**
     * Function to order list by current column.
     * @param {SortOrderType} order
     */
    function handleSortList(order: SortOrderType): void {
      UserListStateMachines.setState('pending', Object.assign({
        offset: {
          page: 1,
          limit: `L${offset.limit}`,
        },
      }, order.type !== 'NONE' ? {
        order,
      } : {}) as UserListParamsType);
    }

    /**
     * Function to change page list.
     * @param {Number} page
     */
    function handleChangePage(page: number): void {
      offset.page = page;
      getUserList();
    }

    /**
     * Function to handle change limit offset.
     * @param {Number} size
     */
    function handleChangeLimitOffsetList(size: number): void {
      offset.limit = size;
      offset.page = 1;
      getUserList();
    }

    /**
     * Function fired when component mounted.
     */
    onMounted(() => getUserList());

    return {
      offset,
      columnsTable,
      handleSortList,
      handleChangePage,
      curretntStateList,
      usersListFromStore,
      handleChangeLimitOffsetList,
    };
  },
});
