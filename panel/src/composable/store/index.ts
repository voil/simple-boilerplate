import store from '@/composable/store/store';
import user from '@/composable/store/modules/userStore';
import teams from '@/composable/store/modules/teamsStore';
import profiles from '@/composable/store/modules/profilesStore';
import projects from '@/composable/store/modules/projectsStore';

store.addModule('user', user);
store.addModule('profiles', profiles);
store.addModule('teams', teams);
store.addModule('projects', projects);

export default store;
