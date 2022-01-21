import { Field, ObjectType } from '@nestjs/graphql';

/**
 * RegisterRequestsType
 * Register requests types.
 *

 */
@ObjectType()
export class RegisterRequestsType {
  @Field(type => String, { description: `Unique uuid identificator.` })
  created_at: string;
}
