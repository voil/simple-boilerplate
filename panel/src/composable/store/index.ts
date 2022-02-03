import store from '@/composable/store/store';
import user from '@/composable/store/modules/userStore';

store.addModule('user', user);

export default store;
