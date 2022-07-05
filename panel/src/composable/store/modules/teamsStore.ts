import { reactive } from 'vue';
// @ts-ignore
import { OffsetType, SortOrderType } from '@/utils/types';
import { UserType } from './userStore';

export type TeamType = {
  uuid: string;
  name: string;
  description: string;
  is_active: boolean;
  can_delete?: boolean;
  created_at: string;
  updated_at: string;
  selected?: boolean;
  users: UserType[];
}

export type TeamsType = {
  records: TeamType[];
  total: number;
  offset: OffsetType;
  order?: SortOrderType;
};

const store: TeamsType = reactive<TeamsType>({
  records: [],
  total: 0,
  offset: {
    page: 1,
    limit: 25,
  },
});

export default store;
