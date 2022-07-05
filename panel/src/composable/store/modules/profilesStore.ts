import { reactive } from 'vue';
// @ts-ignore
import { OffsetType, SortOrderType } from '@/utils/types';

type ProfileType = {
  uuid: string;
  name: string;
  description: string;
  can_delete: boolean;
  label: string;
  created_at: string;
  updated_at: string;
  selected?: boolean;
}

export type ProfilesType = {
  records: ProfileType[];
  total: number;
  offset: OffsetType;
  order?: SortOrderType;
};

const store: ProfilesType = reactive<ProfilesType>({
  records: [],
  total: 0,
  offset: {
    page: 1,
    limit: 25,
  },
});

export default store;
