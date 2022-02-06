import {
  ref,
  Ref,
  defineComponent,
  defineAsyncComponent,
} from 'vue';
import {
  Router,
  useRoute,
  useRouter,
  RouteLocationNormalizedLoaded,
} from 'vue-router';
import { hFirstToLower } from '@/utils/helpers';

/**
 * PanelTemplate
 * Component template panel.
 */
export default defineComponent({
  name: 'PanelTemplate',

  components: {
    LogoAtom: defineAsyncComponent(() => import('@/atomic/atoms/LogoAtom/index.vue')),
    MenuMolecule: defineAsyncComponent(() => import('@/atomic/molecules/MenuMolecule/index.vue')),
    UserLoggedOrganism: defineAsyncComponent(() => import('@/atomic/organisms/UserLoggedOrganism/index.vue')),
  },

  /**
   * Main setup method for componenent.
   * @returns Record<string, unknown>
   */
  setup(): Record<string, unknown> {
    const route: RouteLocationNormalizedLoaded = useRoute();

    /**
     * @var {Router}
     */
    const router: Router = useRouter();
    
    /**
     * @var {Ref<string>}
     */
    const currentActiveMenuElement: Ref<string> = ref<string>(
      hFirstToLower(route?.name?.toString().replace('Page', '') as string),
    );

    /**
     * Funcrtion to handle click on menu element.
     * @param {String} menuElementKey
     */
    async function handleClickElementMenu(menuElementKey: string): Promise<void> {
      const { hFirstToUpper } = await import('@/utils/helpers');
      router.push({ name: `${hFirstToUpper(menuElementKey)}Page` });
    }

    return {
      handleClickElementMenu,
      currentActiveMenuElement,
    };
  },
});
