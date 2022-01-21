import { Field, InputType } from '@nestjs/graphql';
import { RecordsListArgs } from '../../core/graphql/base.args';
import { IsExists } from '../../../support/validators/is.exists.validator';
import { IsPassword } from '../../../support/validators/password.validator';
import {
  IsUUID,
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsBoolean,
  IsOptional
} from 'class-validator';
/**
 * UsersListArgs
 * Users list arguments for resolver.
 *

 */
@InputType()
export class UsersListArgs extends RecordsListArgs() {}

/**
 * CreateUserArgs
 * Create user for resolver.
 *

 */
@InputType()
export class CreateUserArgs {
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

  @Field({ nullable: false })
  @IsString()
  @IsPassword()
  password: string;

  @Field({ nullable: false })
  @IsUUID()
  profile: string;
}

/**
 * DetailsUsersArgs
 * Get detials user for resolver.
 *

 */
@InputType()
export class DetailsUsersArgs {
  @Field({ nullable: false })
  @IsUUID()
  uuid: string;
}

/**
 * DeleteUserArgs
 * Delete user for resolver.
 *

 */
@InputType()
export class DeleteUserArgs {
  @Field({ nullable: false })
  @IsUUID()
  uuid: string;
}

/**
 * UpdateUserArgs
 * Update user for resolver.
 *

 */
@InputType()
export class UpdateUserArgs {
  @Field({ nullable: false })
  @IsUUID()
  uuid: string;

  @Field({ nullable: false })
  @MinLength(3)
  @MaxLength(255)
  @IsString()
  @IsOptional()
  name_and_surname: string;

  @Field({ nullable: true })
  @IsPassword()
  @IsOptional()
  password?: string;

  @Field({ nullable: false })
  @IsUUID()
  profile: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
