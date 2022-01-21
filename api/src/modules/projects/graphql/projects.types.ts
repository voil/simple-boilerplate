import { ProjectsTeamsType } from './teams.types';
import { Field, ObjectType } from '@nestjs/graphql';
import { RecordsListType, RecordType } from '../../core/graphql/base.types';

/**
 * ProjectsType
 * Projects types.
 *

 */
@ObjectType()
export class ProjectsType {
  @Field(type => String, { description: `Unique uuid identificator.` })
  uuid: string;

  @Field(type => String, { description: `Name of project.` })
  name?: string;

  @Field(type => String, { description: `Description of project.` })
  description?: string;

  @Field(type => Boolean, { description: `State of project.` })
  is_active?: boolean;

  @Field(type => Boolean, { description: `Is global project.` })
  is_global?: boolean;

  @Field(type => String, { description: `Date of created records.` })
  created_at?: string;

  @Field(type => String, {
    description: `Date of updated records.`,
    nullable: true,
  })
  updated_at?: string | null;

  @Field(type => ProjectsTeamsType, {
    description: `Team assigned to current project.`,
    nullable: true,
  })
  team: ProjectsTeamsType;
}

/**
 * ProjectsResponseType
 * Projects response type.
 *
 * @extends RecordsListType<TItem>

 */
@ObjectType()
export class ProjectsResponseType extends RecordsListType(ProjectsType) {
  //...
}

/**
 * ProjectResponseType
 * Project response type.
 *
 * @extends RecordType<TItem>

 */
@ObjectType()
export class ProjectResponseType extends RecordType(ProjectsType) {
  //...
}
