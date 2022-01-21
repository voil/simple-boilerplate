import { Field, InputType } from '@nestjs/graphql';
import { IsExists } from '../../../support/validators/is.exists.validator';
import { IsPassword } from '../../../support/validators/password.validator';
import {
  MinLength,
  IsString,
  MaxLength,
  IsEmail,
  IsUUID,
  IsIn,
} from 'class-validator';

/**
 * CreateRegisterRequestsArgs
 * Create register requests arguments for resolver.
 *

 */
@InputType()
export class CreateRegisterRequestsArgs {
  @Field({ nullable: false })
  @MinLength(3)
  @MaxLength(255)
  @IsString()
  name_and_surname: string;

  @Field({ nullable: false })
  @MinLength(3)
  @MaxLength(255)
  @IsEmail()
  @IsExists({
    table: 'users',
    column: 'email',
    condition: true,
  })
  email: string;

  @Field({ nullable: true })
  @IsString()
  @IsPassword()
  password: string;

  @Field({ nullable: false })
  @IsIn(['pl', 'en'])
  language: string;
}

/**
 * ActiveRegisterRequestsArgs
 * Active register requests arguments for resolver.
 *

 */
@InputType()
export class ActiveRegisterRequestsArgs {
  @Field({ nullable: true })
  @IsUUID()
  uuid: string;
}
