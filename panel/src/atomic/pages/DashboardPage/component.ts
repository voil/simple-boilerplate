import {
  computed,
  defineComponent,
  ComputedRef,
} from 'vue';
import Store from '@/composable/store';
import LoggedUserStateMachine from '@/composable/store/machines/authorization/loggedUserStateMachine';

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

    function logout() {
      LoggedUserStateMachine.setState('pendingLogout');
    }

    return {
      user,
      logout,
    };
  },
});
