import { Field, ObjectType } from '@nestjs/graphql';
import { RecordType } from '../../core/graphql/base.types';
import { LoggedUserProfilesType } from './logged.user.profile.types';
import { LoggedUserTeamsType } from '../graphql/logged.user.teams.types';

/**
 * LoggedUserType
 * Logged user types.
 *

 */
@ObjectType()
export class LoggedUserType {
  @Field(type => String, { description: `Unique uuid identificator.` })
  uuid: string;

  @Field(type => String, { description: `Name and suername of user.` })
  name_and_surname?: string;

  @Field(type => String, { description: `Email of user.` })
  email?: string;

  @Field(type => LoggedUserProfilesType, { description: `profile of user.` })
  profile?: LoggedUserProfilesType;

  @Field(type => [LoggedUserTeamsType], { description: `teams of user.` })
  teams?: LoggedUserTeamsType[];

  @Field(type => Boolean, { description: `State of role.` })
  is_active?: boolean;

  @Field(type => String, { description: `Date of created records.` })
  created_at?: string;

  @Field(type => String, { description: `Date of updated records.` })
  updated_at?: string;
}


/**
 * LoggedUserResponseType
 * Logged user response type.
 *
 * @extends RecordType<TItem>

 */
@ObjectType()
export class LoggedUserResponseType extends RecordType(
  LoggedUserType,
) {
  //...
}
