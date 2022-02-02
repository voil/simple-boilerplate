import Store from '@/composable/store/store';
import QueryDispatcher from '@/services/cqrs/queryDispatcher';
import { UserType } from '@/composable/store/modules/userStore';
import StateMachineService, { PayloadParametersType } from '@/services/stateMachineService';
import GetLoggedUserQuery from '@/composable/cqrs/authorization/queries/getLoggedUserQuery';

/**
 * @var {LoggedUserParamsType}
 */
export type LoggedUserParamsType = {
  [handlerError: string]: () => void;
  handlerSuccess: () => void;
}

/**
 * @var {ResponseUserType}
 */
type ResponseUserType = {
  record: UserType;
}

const machine = new StateMachineService('logout');

/**
 * State for pending logout user from platform.
 */
machine.addState('pendingLogout');

/**
 * State for pending to check is user logged to platform.
 */
machine.addState('pendingCheckLogged', async (params: PayloadParametersType<LoggedUserParamsType>) => {
  const response = await QueryDispatcher.execute(new GetLoggedUserQuery());

  machine.setState(!response ? 'logout' : 'login', !response ? {} : response);
  params[!response ? 'handlerError' : 'handlerSuccess']();
});

/**
 * State for set logged user to platorm.
 */
machine.addState('login', async (payload: PayloadParametersType<ResponseUserType>) => {
  await Store.commit('user', payload.record);
});

/**
 * State for set logout user from platform.
 */
machine.addState('logout');

export default machine;
