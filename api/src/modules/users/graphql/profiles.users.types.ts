import { Field, ObjectType } from '@nestjs/graphql';
import { Profiles } from '../entities/profiles.entity';

/**
 * UsersType
 * Users types.
 *

 */
@ObjectType()
export class ProfilesUsersType {
  @Field(type => String, { description: `Unique uuid identificator.` })
  uuid: string;

  @Field(type => String, { description: `Name  of profile.` })
  name?: string;

  @Field(type => String, { description: `Description of profile.` })
  description?: string;

  @Field(type => String, { description: `Privilages of profile.` })
  privilages?: string;

  @Field(type => String, { description: `Date of created records.` })
  created_at?: string;

  @Field(type => String, { description: `Date of updated records.` })
  updated_at?: string;
}
