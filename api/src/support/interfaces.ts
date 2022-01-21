import { OrderTypes, LimitTypes, FilteringTypes } from './enums';

export interface ResponseExceptionHandler {
  [key: string]: string | number;
  message: string;
  code: number;
  type: string;
}

export interface PubSubInterface {
  asyncIterator<T>(triggers: string | string[]): AsyncIterator<T, any, undefined>;
  publish(triggerName: string, payload: any): Promise<void>;
}

export interface ProfilesTypeInterface {
  [key: string]: string | number;
  name: string;
  description: string;
  account: number;
  privilages?: string;
}

export interface ProjectTypeInterface {
  [key: string]: string | number | boolean;
  name: string;
  description: string;
  account: number;
  is_global?: boolean;
  team: number|string;
}

export interface UsersTypeInterface {
  [key: string]: string | number;
  name_and_surname: string;
  email: string;
  password: string;
  account: number;
  profile: number | string;
}

export interface TeamsTypeInterface {
  [key: string]: string | number;
  name: string;
  description: string;
}

export interface CreateUserParamsInterface {
  [key: string]: string | number;
  name_and_surname: string;
  email: string;
  password: string;
  account: number | string;
}

export interface RegisterRequestInterface {
  [key: string]: string;
  name_and_surname: string;
  password: string;
  email: string;
}

export interface BaseEntityInterface {}

export interface ResponseEndpointInterface {
  [key: string]: string | number | Array<any> | BaseEntityInterface;
  page?: number;
  total: number;
  records?: Array<BaseEntityInterface>;
  record?: BaseEntityInterface;
}

export interface IsExistsValidatorParamsInterface {
  [key: string]: string | boolean;
  table?: string;
  cache?: string;
  column: string;
  condition: boolean;
}

export interface OffsetTypeInterface {
  [key: string]: number | LimitTypes;
  page?: number;
  limit?: LimitTypes;
}

export interface OrderByTypeInterface {
  [key: string]: string | OrderTypes;
  field?: string;
  type?: OrderTypes;
}

export interface FiltersCriteriaTypeInterface {
  [key: string]: string | FilteringTypes;
  field: string;
  type: FilteringTypes;
  value: any;
}

export interface ExceptionErrorHandler {}

export interface EnumTypeInterface {}
