import { Field, ObjectType } from '@nestjs/graphql';
import { RecordsListType, RecordType } from '../../core/graphql/base.types';

/**
 * ProfilesType
 * Profiles types.
 *
 */
@ObjectType()
export class ProfilesType {
  @Field(type => String, { description: `Unique uuid identificator.` })
  uuid: string;

  @Field(type => String, { description: `Name of role.` })
  name?: string;

  @Field(type => String, { description: `Description of role.` })
  description?: string;

  @Field(type => String, { description: `Label of role.` })
  label?: string;

  @Field(type => String, { description: `Privilages for current role.` })
  privilages?: string;

  @Field(type => Boolean, { description: `State of role.` })
  is_active?: boolean;

  @Field(type => String, { description: `Date of created records.` })
  created_at?: string;
  
  @Field(type => String, { nullable: true, description: `Date of updated records.` })
  updated_at?: string;

  @Field(type => Boolean, { description: `State if can delete current role.` })
  can_delete?: boolean;
}

/**
 * ProfilesResponseType
 * Profiles response type.
 *
 * @extends RecordsListType<TItem>

 */
@ObjectType()
export class ProfilesResponseType extends RecordsListType(
  ProfilesType,
) {
  //...
}

/**
 * ProfileResponseType
 * Profile response type.
 *
 * @extends RecordType<TItem>

 */
@ObjectType()
export class ProfileResponseType extends RecordType(
  ProfilesType,
) {
  //...
}