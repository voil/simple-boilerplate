import { Field, ObjectType } from '@nestjs/graphql';

/**
 * LoggedUserTeamsType
 * Logged user teams types.
 *

 */
@ObjectType()
export class LoggedUserTeamsType {
  @Field(type => String, { description: `Unique uuid identificator.` })
  uuid: string;

  @Field(type => String, { description: `Name of team.` })
  name?: string;

  @Field(type => String, { description: `Description of team.` })
  description?: string;

  @Field(type => Boolean, { description: `State of team.` })
  is_active?: boolean;

  @Field(type => String, { description: `Date of created records.` })
  created_at?: string;

  @Field(type => String, { description: `Date of updated records.` })
  updated_at?: string;
}
