import { Field, InputType } from '@nestjs/graphql';
import { MinLength, IsString, MaxLength, IsEmail } from 'class-validator';
import { IsExists } from '../../../support/validators/is.exists.validator';
import { IsPassword } from '../../../support/validators/password.validator';

/**
 * LoginArgs
 * Login arguments for resolver.
 *

 */
@InputType()
export class LoginArgs {
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

  @Field({ nullable: true })
  @IsString()
  @IsPassword()
  password: string;
}
