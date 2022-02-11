import Store from '@/composable/store';
import { OffsetType, SortOrderType } from '@/utils/types';
import QueryDispatcher from '@/services/cqrs/queryDispatcher';
import { UsersType } from '@/composable/store/modules/usersStore';
import GetUsersList from '@/composable/cqrs/users/queries/getUsersList';
import StateMachineService, { PayloadParametersType } from '@/services/stateMachineService';

const machine = new StateMachineService('default');

/**
 * @var {UsersListParams}
 */
export type UserListParamsType = {
  offset: OffsetType;
  order?: SortOrderType;
}

/**
 * Main state for machine.
 */
machine.addState('default');

/**
 * State for pending and submit form (login user to platform).
 */
machine.addState<UserListParamsType>('pending',
  async (payload: PayloadParametersType<UserListParamsType>) => {
    const response: UsersType | null = await QueryDispatcher.execute(new GetUsersList(payload));

    Store.commit('users', response);
    machine.setState('default');
  });

export default machine;
