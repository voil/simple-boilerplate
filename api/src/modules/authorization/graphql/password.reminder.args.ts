import { Field, InputType } from '@nestjs/graphql';
import { IsExists } from '../../../support/validators/is.exists.validator';
import { IsPassword } from '../../../support/validators/password.validator';
import {
  MinLength,
  MaxLength,
  IsEmail,
  IsUUID,
  IsString,
  IsIn,
} from 'class-validator';

/**
 * CreatePasswordReminderArgs
 * Create password reminder arguments for resolver.
 *

 */
@InputType()
export class CreatePasswordReminderArgs {
  @Field({ nullable: false })
  @MinLength(3)
  @MaxLength(255)
  @IsEmail()
  @IsExists({
    table: 'users',
    column: 'email',
    condition: false,
  })
  email: string;

  @Field({ nullable: false })
  @IsIn(['pl', 'en'])
  language: string;
}

/**
 * ActivePasswordReminderRequestsArgs
 * Active password reminder arguments for resolver.
 *

 */
@InputType()
export class ActivePasswordReminderRequestsArgs {
  @Field({ nullable: true })
  @IsUUID()
  uuid: string;
}

/**
 * ChangePasswordReminderRequestsArgs
 * Change password reminder arguments for resolver.
 *

 */
@InputType()
export class ChangePasswordReminderRequestsArgs {
  @Field({ nullable: true })
  @IsUUID()
  uuid: string;

  @Field({ nullable: true })
  @IsString()
  @IsPassword()
  password: string;
}
