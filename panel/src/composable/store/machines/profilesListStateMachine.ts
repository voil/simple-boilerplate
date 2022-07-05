import Store from '@/composable/store';
import { OffsetType, SortOrderType } from '@/utils/types';
import QueryDispatcher from '@/services/cqrs/queryDispatcher';
import GetProfilesList from '@/composable/cqrs/profiles/getProfilesList';
import { ProfilesType } from '@/composable/store/modules/profilesStore';
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
