import { reactive } from 'vue';

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
}

export type UsersType = {
  records: UserType[];
  total: number;
};

const store: UsersType = reactive<UsersType>({
  records: [],
  total: 0,
});

export default store;
