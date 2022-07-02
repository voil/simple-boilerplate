import { reactive } from 'vue';
import { OffsetType, SortOrderType } from '@/utils/types';

/**
 * @var {TeamType}
 */
type TeamType = {
  uuid: string;
};

/**
 * @var {ProfileType}
 */
type ProfileType = {
  uuid: string;
};

type UserType = {
  created_at: string;
  email: string;
  is_active: boolean;
  name_and_surname: string;
  profile: ProfileType;
  teams: TeamType[];
  updated_at: string;
  uuid: string;
  selected: boolean;
}

export type UsersType = {
  records: UserType[];
  total: number;
  offset: OffsetType;
  order?: SortOrderType;
};

const store: UsersType = reactive<UsersType>({
  records: [],
  total: 0,
  offset: {
    page: 1,
    limit: 25,
  },
});

export default store;
