import { Field, ObjectType } from '@nestjs/graphql';

/**
 * PasswordReminderType
 * Password reminder types.
 *

 */
@ObjectType()
export class PasswordReminderType {
  @Field(type => String, { description: `Unique uuid identificator.` })
  created_at: String;
}
