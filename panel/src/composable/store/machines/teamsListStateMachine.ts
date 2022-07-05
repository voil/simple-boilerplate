import Store from '@/composable/store';
import CommandBus from '@/services/cqrs/commandBus';
import { OffsetType, SortOrderType } from '@/utils/types';
import QueryDispatcher from '@/services/cqrs/queryDispatcher';
import GetTeamsList from '@/composable/cqrs/teams/queries/getTeamsListQuery';
import { TeamsType } from '@/composable/store/modules/teamsStore';
import DeleteTeamCommand from '@/composable/cqrs/teams/commands/deleteTeamCommand';
import StateMachineService, { PayloadParametersType } from '@/services/stateMachineService';

const machine = new StateMachineService('default');

/**
 * @var {TeamsListParams}
 */
export type TeamsListParams = {
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
    await CommandBus.handle(new DeleteTeamCommand(payload as string[]));
  });

/**
* State for show success delete record.
*/
machine.addState('successDelete', async () => {
  machine.setState('pending');
  const notificiationService = (await import('@/services/notificationService')).default;
  notificiationService.success({
    title: 'Success delete',
    description: 'Team successfully deleted',
  });
});

/**
* State for show error delete record.
*/
machine.addState('errorDelete', async () => {
  const notificiationService = (await import('@/services/notificationService')).default;
  notificiationService.error({
    title: 'Error delete',
    description: 'Team error deleted',
  });
});

/**
 * State for pending and submit form (login user to platform).
 */
machine.addState<TeamsListParams>('pending', async () => {
  const response: TeamsType | null = await QueryDispatcher
    .execute<TeamsType | null>(new GetTeamsList({
      offset: {
        ...Store.get('teams')?.offset,
        limit: `L${Store.get('teams')?.offset.limit}`,
      },
      order: Store.get('teams')?.order,
    }));

  if (response) {
    response.records = response.records.map((record) => {
      const recordItem = record;
      recordItem.selected = false;
      recordItem.can_delete = recordItem.users.length === 0;
      return recordItem;
    });
  }
  Store.commit('teams', response);
  machine.setState('default');
});

export default machine;
