<template>
  <div>
    application
  </div>
</template>
<script>
import {
  onMounted,
  defineComponent,
} from 'vue';
import LoginToPlatformCommand from '@/composable/cqrs/authorization/commands/loginToPlatformCommand';
import CommandBus from '@/services/cqrs/commandBus';

export default defineComponent({
  name: 'App',

  setup: () => {
    onMounted(() => {
      CommandBus.handle(new LoginToPlatformCommand());
      // QueryDispatcher.execute(new GetLoggedUserQuery());

      // CommandBus.handle(new CloseAllNoActiveRemindPasswordRequestForUser(request.getUser()));

      // QueryDispatcher.execute(new GetLoggedUserQuery());
    });
    return {};
  },
});

</script>
