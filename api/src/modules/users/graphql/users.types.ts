import { Field, ObjectType } from '@nestjs/graphql';
import { ProfilesUsersType } from './profiles.users.types';
import { RecordsListType, RecordType } from '../../core/graphql/base.types';
import { UserTeamsType } from './teams.types';

/**
 * UsersType
 * Users types.
 *

 */
@ObjectType()
export class UsersType {
  @Field(type => String, { description: `Unique uuid identificator.` })
  uuid: string;

  @Field(type => String, { description: `Name and suername of user.` })
  name_and_surname?: string;

  @Field(type => String, { description: `Email of user.` })
  email?: string;

  @Field(type => ProfilesUsersType, { description: `profile of user.` })
  profile?: ProfilesUsersType;

  @Field(type => Boolean, { description: `State of role.` })
  is_active?: boolean;

  @Field(type => String, { description: `Date of created records.` })
  created_at?: string;

  @Field(type => String, { nullable: true, description: `Date of updated records.` })
  updated_at?: string;

  @Field(type => [UserTeamsType], { nullable: true, description: `Teams of users records.` })
  teams?: UserTeamsType[];

  @Field(type => Boolean, { nullable: true, description: `If can remove user.` })
  canDelete?: boolean;
}


/**
 * UsersResponseType
 * Users response type.
 *
 * @extends RecordsListType<TItem>

 */
@ObjectType()
export class UsersResponseType extends RecordsListType(
  UsersType,
) {
  //...
}

/**
 * UserResponseType
 * User response type.
 *
 * @extends RecordType<TItem>

 */
@ObjectType()
export class UserResponseType extends RecordType(
  UsersType,
) {
  //...
}
