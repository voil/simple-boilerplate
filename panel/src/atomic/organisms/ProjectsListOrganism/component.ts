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
import { OffsetType } from '@/utils/types';
import { PayloadStoreType } from '@/composable/store/store';
import { ProjectsType } from '@/composable/store/modules/projectsStore';
import ProjectsListStateMachine from '@/composable/store/machines/projectsListStateMachine';

/**
 * Projects List Organism
 * Component organism projects list.
 */
export default defineComponent({
  name: 'ProjectsListOrganism',

  components: {
    SpinnerAtom: defineAsyncComponent(() => import('@/atomic/atoms/SpinnerAtom/index.vue')),
    PageListSizerAtom: defineAsyncComponent(() => import('@/atomic/atoms/PageListSizerAtom/index.vue')),
    PaginationListAtom: defineAsyncComponent(() => import('@/atomic/atoms/PaginationListAtom/index.vue')),
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
    const curretntStateList: ComputedRef<string> = computed(() => ProjectsListStateMachine
      .getCurrentState());

    /**
    * @var {ComputedRef<PayloadStoreType<UsersType> | null>}
    */
    const projectsListFromStore: ComputedRef<PayloadStoreType<ProjectsType> | null> = computed(() => Store.get('projects'));

    /**
     * @var {Ref<string[]>}
     */
    const elementsToDelete: Ref<string[]> = ref<string[]>([]);

    /**
     * @var {Ref<boolean>}
     */
    const isPopoverConfirmVisible: Ref<boolean> = ref<boolean>(false);

    /**
     * @var {ComputedRef<OffsetType>}
     */
    const offset: ComputedRef<OffsetType> = computed(() => Store.get('projects')?.offset);

    /**
     * Function to get list.
     */
    function getProjectsList(): void {
      ProjectsListStateMachine.setState('pending');
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
     * Function to change page list.
     * @param {Number} page
     */
    function handleChangePage(page: number): void {
      Store.commit('projects', {
        offset: {
          ...Store.get('projects')?.offset,
          page,
        },
      });
      getProjectsList();
    }

    /**
     * Function to handle change limit offset.
     * @param {Number} size
     */
    function handleChangeLimitOffsetList(size: number): void {
      Store.commit('projects', {
        offset: {
          page: 1,
          limit: size,
        },
      });
      getProjectsList();
    }

    /**
     * Function to handle confirm delete elements list.
     */
    async function handleConfirmDeleteAction(): Promise<void> {
      await ProjectsListStateMachine.setState('pendingDelete', elementsToDelete.value);
      elementsToDelete.value = [];
      isPopoverConfirmVisible.value = false;
    }

    /**
     * Function fired when component mounted.
     */
    onMounted(() => getProjectsList());

    return {
      offset,
      handleChangePage,
      curretntStateList,
      handleDeleteElements,
      projectsListFromStore,
      isPopoverConfirmVisible,
      handleConfirmDeleteAction,
      handleChangeLimitOffsetList,
    };
  },
});
