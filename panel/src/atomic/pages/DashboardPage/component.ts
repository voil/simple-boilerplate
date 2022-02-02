import {
  computed,
  defineComponent,
} from 'vue';
import Store from '@/composable/store/store';

/**
 * Login
 * Component page login.
 *
 * @author Przemysław Drzewicki <przemyslaw.drzewicki@gmail.com>
 */
export default defineComponent({
  name: 'DashboardPage',

  setup() {
    const user = computed(() => Store.get('user'));

    return {
      user,
    };
  },
});
