import Store from '@/composable/store';
import CommandBus from '@/services/cqrs/commandBus';
import { OffsetType, SortOrderType } from '@/utils/types';
import QueryDispatcher from '@/services/cqrs/queryDispatcher';
import GetProfilesList from '@/composable/cqrs/profiles/queries/getProfilesListQuery';
import { ProfilesType } from '@/composable/store/modules/profilesStore';
import DeleteProfileCommand from '@/composable/cqrs/profiles/commands/deleteProfileCommand';
import StateMachineService, { PayloadParametersType } from '@/services/stateMachineService';

const machine = new StateMachineService('default');

/**
 * @var {ProfilesListParams}
 */
export type ProfilesListParams = {
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
    await CommandBus.handle(new DeleteProfileCommand(payload as string[]));
  });

/**
* State for show success delete record.
*/
machine.addState('successDelete', async () => {
  machine.setState('pending');
  const notificiationService = (await import('@/services/notificationService')).default;
  notificiationService.success({
    title: 'Success delete',
    description: 'Profile successfully deleted',
  });
});

/**
* State for show error delete record.
*/
machine.addState('errorDelete', async () => {
  const notificiationService = (await import('@/services/notificationService')).default;
  notificiationService.error({
    title: 'Error delete',
    description: 'Profile error deleted',
  });
});

/**
 * State for pending and submit form (login user to platform).
 */
machine.addState<ProfilesListParams>('pending', async () => {
  const response: ProfilesType | null = await QueryDispatcher
    .execute<ProfilesType | null>(new GetProfilesList({
      offset: {
        ...Store.get('profiles')?.offset,
        limit: `L${Store.get('profiles')?.offset.limit}`,
      },
      order: Store.get('profiles')?.order,
    }));

  if (response) {
    response.records = response.records.map((record) => {
      const recordItem = record;
      recordItem.selected = false;
      return recordItem;
    });
  }
  Store.commit('profiles', response);
  machine.setState('default');
});

export default machine;
