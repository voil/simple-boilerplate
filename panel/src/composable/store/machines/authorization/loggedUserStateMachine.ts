import StateMachineService, { PayloadParametersType } from '@/services/stateMachineService';
import QueryDispatcher from '@/services/cqrs/queryDispatcher';
import GetLoggedUserQuery from '@/composable/cqrs/authorization/queries/getLoggedUserQuery';

const machine = new StateMachineService('logout');

/**
 * State for pending logout user from platform.
 */
machine.addState('pendingLogout');

/**
 * State for pending to check is user logged to platform.
 */
machine.addState('pendingCheckLogged', async () => {
  const response = await QueryDispatcher.execute(new GetLoggedUserQuery());
});

/**
 * State for set logged user to platorm.
 */
 machine.addState('login', async () => {});

 /**
 * State for set logout user from platform.
 */
machine.addState('logout', async () => {});

export default machine;


