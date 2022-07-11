import { reactive } from 'vue';
import { OffsetType, SortOrderType } from '@/utils/types';
import { TeamType } from './teamsStore';

type ProjectType = {
  uuid: string;
  name: string;
  description: string;
  is_global: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  selected?: boolean;
  team: TeamType[];
}

export type ProjectsType = {
  records: ProjectType[];
  total: number;
  offset: OffsetType;
  order?: SortOrderType;
};

const store: ProjectsType = reactive<ProjectsType>({
  records: [],
  total: 0,
  offset: {
    page: 1,
    limit: 25,
  },
});

export default store;
