import Store from '@/composable/store';
import CommandBus from '@/services/cqrs/commandBus';
import { OffsetType, SortOrderType } from '@/utils/types';
import QueryDispatcher from '@/services/cqrs/queryDispatcher';
import GetProjectsList from '@/composable/cqrs/projects/queries/getProjectsListQuery';
import { ProjectsType } from '@/composable/store/modules/projectsStore';
import DeleteProjectCommand from '@/composable/cqrs/projects/commands/deleteProjectCommand';
import StateMachineService, { PayloadParametersType } from '@/services/stateMachineService';

const machine = new StateMachineService('default');

/**
 * @var {ProjectsListParams}
 */
export type ProjectsListParams = {
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
    await CommandBus.handle(new DeleteProjectCommand(payload as string[]));
  });

/**
* State for show success delete record.
*/
machine.addState('successDelete', async () => {
  machine.setState('pending');
  const notificiationService = (await import('@/services/notificationService')).default;
  notificiationService.success({
    title: 'Success delete',
    description: 'Project successfully deleted',
  });
});

/**
* State for show error delete record.
*/
machine.addState('errorDelete', async () => {
  const notificiationService = (await import('@/services/notificationService')).default;
  notificiationService.error({
    title: 'Error delete',
    description: 'Project error deleted',
  });
});

/**
 * State for pending.
 */
machine.addState<ProjectsListParams>('pending', async () => {
  const response: ProjectsType | null = await QueryDispatcher
    .execute<ProjectsType | null>(new GetProjectsList({
      offset: {
        ...Store.get('projects')?.offset,
        limit: `L${Store.get('projects')?.offset.limit}`,
      },
      order: Store.get('projects')?.order,
    }));

  if (response) {
    response.records = response.records.map((record) => {
      const recordItem = record;
      recordItem.selected = false;
      return recordItem;
    });
  }
  Store.commit('projects', response);
  machine.setState('default');
});

export default machine;
