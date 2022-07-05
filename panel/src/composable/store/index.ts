import store from '@/composable/store/store';
import user from '@/composable/store/modules/userStore';
import profiles from '@/composable/store/modules/teamsStore';

store.addModule('user', user);
store.addModule('profiles', profiles);
store.addModule('teams', profiles);

export default store;
