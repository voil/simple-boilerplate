import { Field, InputType } from '@nestjs/graphql';
import { RecordsListArgs } from '../../core/graphql/base.args';
import {
  IsUUID,
  IsArray,
  IsString,
  MinLength,
  IsBoolean,
  IsOptional
} from 'class-validator';

/**
 * ProfilesListArgs
 * Profile list arguments for resolver.
 *
 */
@InputType()
export class ProfilesListArgs extends RecordsListArgs() {}

/**
 * CreateProfileArgs
 * Create profile for resolver.
 *

 */
@InputType()
export class CreateProfileArgs {
  @Field({ nullable: false })
  @MinLength(3)
  @IsString()
  name: string;

  @Field({ nullable: false })
  @MinLength(3)
  @IsString()
  description: string;

  @Field({ nullable: true })
  @IsString()
  privilages: string;
}

/**
 * DeleteProfileArgs
 * Delete profile for resolver.
 *

 */
@InputType()
export class DeleteProfileArgs {
  @Field(() => [String], { nullable: false })
  @IsArray()
  records: Array<String>;
}

/**
 * DetailsProfileArgs
 * Get detials profile for resolver.
 *

 */
@InputType()
export class DetailsProfileArgs {
  @Field({ nullable: false })
  @IsUUID()
  uuid: string;
}

/**
 * UpdateProfileArgs
 * Update profile for resolver.
 *

 */
@InputType()
export class UpdateProfileArgs {
  @Field({ nullable: false })
  @IsUUID()
  uuid: string;

  @Field({ nullable: true })
  @MinLength(3)
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @MinLength(3)
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  privilages?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
