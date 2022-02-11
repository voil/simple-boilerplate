import store from '@/composable/store/store';
import user from '@/composable/store/modules/userStore';
import users from '@/composable/store/modules/usersStore';

store.addModule('user', user);
store.addModule('users', users);

export default store;
