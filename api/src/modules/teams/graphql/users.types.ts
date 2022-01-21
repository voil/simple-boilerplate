import { Field, ObjectType } from '@nestjs/graphql';
import { ProfilesUserTeamsType } from './profiles.users.types';

/**
 * UsersType
 * Users types.
 *

 */
@ObjectType()
export class UsersTeamsType {
  @Field(type => String, { description: `Unique uuid identificator.` })
  uuid: string;

  @Field(type => String, { description: `Name and suername of user.` })
  name_and_surname?: string;

  @Field(type => String, { description: `Email of user.` })
  email?: string;

  @Field(type => ProfilesUserTeamsType, { description: `profile of user.` })
  profile?: ProfilesUserTeamsType;

  @Field(type => Boolean, { description: `State of role.` })
  is_active?: boolean;

  @Field(type => String, { description: `Date of created records.` })
  created_at?: string;

  @Field(type => String, { description: `Date of updated records.` })
  updated_at?: string;
}
