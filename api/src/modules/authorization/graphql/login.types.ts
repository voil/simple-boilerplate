import { Field, ObjectType } from '@nestjs/graphql';

/**
 * LoginType
 * Login types.
 *

 */
@ObjectType()
export class LoginType {
  @Field(type => Boolean, { description: `State of login access` })
  state: boolean;
}
