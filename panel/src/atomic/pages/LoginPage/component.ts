import {
  defineComponent,
  defineAsyncComponent,
} from 'vue';
import NotificationService from '@/services/notificationService';

/**
 * Login
 * Component page login.
 *

 */
export default defineComponent({
  name: 'LoginPage',

  components: {
    LoginFormOrganism: defineAsyncComponent(() => import('@/atomic/organisms/LoginFormOrganism/index.vue')),
    AuthenticationTemplate: defineAsyncComponent(() => import('@/atomic/templates/AuthenticationTemplate/index.vue')),
  },
});
