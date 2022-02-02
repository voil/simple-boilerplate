import { reactive } from 'vue';

/**
 * @var {TeamType}
 */
type TeamType = {};

/**
 * @var {ProfileType}
 */
type ProfileType = {
  uuid: string;
  name: string;
  privilages: string;
};

/**
 * @var {UserType}
 */
export type UserType = {
  uuid?: string;
  name_and_surname?: string;
  profile?: ProfileType;
  teams?: TeamType[]
}

const store: UserType = reactive<UserType>({});
export default store;
