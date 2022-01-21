import { UsersTeamsType } from './users.types';
import { Field, ObjectType } from '@nestjs/graphql';
import { RecordsListType, RecordType } from '../../core/graphql/base.types';

/**
 * TeamsType
 * Teams types.
 *

 */
@ObjectType()
export class TeamsType {
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

  @Field(type => String, { nullable: true, description: `Date of updated records.` })
  updated_at?: string;

  @Field(type => [UsersTeamsType], {
    description: `User assigned to current team.`,
    nullable: true,
  })
  users?: UsersTeamsType[];
}


/**
 * TeamsResponseType
 * Teams response type.
 *
 * @extends RecordsListType<TItem>

 */
@ObjectType()
export class TeamsResponseType extends RecordsListType(
  TeamsType,
) {
  //...
}

/**
 * TeamResponseType
 * Team response type.
 *
 * @extends RecordType<TItem>

 */
@ObjectType()
export class TeamResponseType extends RecordType(
  TeamsType,
) {
  //...
}