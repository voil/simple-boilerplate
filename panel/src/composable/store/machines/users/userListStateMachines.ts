import Store from '@/composable/store';
import CommandBus from '@/services/cqrs/commandBus';
import { OffsetType, SortOrderType } from '@/utils/types';
import QueryDispatcher from '@/services/cqrs/queryDispatcher';
import { UsersType } from '@/composable/store/modules/usersStore';
import GetUsersList from '@/composable/cqrs/users/queries/getUsersList';
import DeleteUserCommand from '@/composable/cqrs/users/commands/deleteUserCommand';
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
 * State for remove element from list.
 */
machine.addState<string[]>('pendingDelete',
  async (payload: PayloadParametersType<string[]>) => {
    await CommandBus.handle(new DeleteUserCommand(payload as string[]));
  });

/**
 * State for show success delete record.
 */
machine.addState('successDelete', async () => {
  machine.setState('pending');
  const notificiationService = (await import('@/services/notificationService')).default;
  notificiationService.success({
    title: 'Success delete',
    description: 'User successfully deleted',
  });
});

/**
 * State for show error delete record.
 */
machine.addState('errorDelete', async () => {
  const notificiationService = (await import('@/services/notificationService')).default;
  notificiationService.success({
    title: 'Error delete',
    description: 'User error deleted',
  });
});

/**
 * State for pending and submit form (login user to platform).
 */
machine.addState<UserListParamsType>('pending', async () => {
  const response: UsersType | null = await QueryDispatcher.execute(new GetUsersList({
    offset: {
      ...Store.get('users')?.offset,
      limit: `L${Store.get('users')?.offset.limit}`,
    },
    order: Store.get('users')?.order,
  }));

  if (response) {
    response.records = response.records.map((record) => {
      record.selected = false;
      return record;
    });
  }
  Store.commit('users', response);
  machine.setState('default');
});

export default machine;
