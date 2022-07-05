import store from '@/composable/store/store';
import user from '@/composable/store/modules/userStore';
import profiles from '@/composable/store/modules/profilesStore';

store.addModule('user', user);
store.addModule('profiles', profiles);

export default store;
