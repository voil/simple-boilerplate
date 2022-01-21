import { Field, ObjectType } from '@nestjs/graphql';
import { PrivilageTypesType } from './privilages.types.types';
import { RecordsListType } from '../../core/graphql/base.types';

/**
 * PrivilageCategorieType
 * Privilage categorie types.
 *

 */
@ObjectType()
export class PrivilageCategorieType {
  @Field(type => String, { description: `Unique uuid identificator.` })
  uuid: string;

  @Field(type => String, { description: `Description of privilage categorie.` })
  description?: string;

  @Field(type => String, { description: `Label of privilage categorie.` })
  label?: string;

  @Field(type => Boolean, { description: `State of privilage categorie.` })
  is_active?: boolean;

  @Field(type => [PrivilageTypesType], {
    description: `Types for current category.`,
  })
  types?: PrivilageTypesType[];

  @Field(type => String, { description: `Date of created records.` })
  created_at?: string;
  
  @Field(type => String, { nullable: true, description: `Date of updated records.` })
  updated_at?: string;
}

/**
 * PrivilageCategorieResponseType
 * Privilage categorie response type.
 *
 * @extends RecordsListType<TItem>

 */
@ObjectType()
export class PrivilageCategorieResponseType extends RecordsListType(
  PrivilageCategorieType,
) {
  //...
}
