import { Field, ObjectType } from '@nestjs/graphql';

/**
 * PrivilageTypesType
 * Privilage types types.
 *

 */
@ObjectType()
export class PrivilageTypesType {
  @Field(type => String, { description: `Unique uuid identificator.` })
  uuid: string;

  @Field(type => String, { description: `Description of privilage categorie.` })
  description?: string;

  @Field(type => String, { description: `Label of privilage categorie.` })
  label?: string;

  @Field(type => Boolean, { description: `State of privilage categorie.` })
  is_active?: boolean;
}
