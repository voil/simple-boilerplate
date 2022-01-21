import { Field, InputType } from '@nestjs/graphql';
import {
  IsUUID,
  IsString,
  MinLength,
  MaxLength,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { RecordsListArgs } from '../../core/graphql/base.args';

/**
 * TeamsListArgs
 * Teams list arguments for resolver.
 *

 */
@InputType()
export class TeamsListArgs extends RecordsListArgs() {}

/**
 * CreateTeamArgs
 * Create team for resolver.
 *

 */
@InputType()
export class CreateTeamArgs {
  @Field({ nullable: false })
  @MinLength(3)
  @MaxLength(255)
  @IsString()
  name: string;

  @Field({ nullable: false })
  @MinLength(3)
  @MaxLength(255)
  @IsString()
  description: string;
}

/**
 * UpdateTeamArgs
 * Update team for resolver.
 *

 */
@InputType()
export class UpdateTeamArgs {
  @Field({ nullable: false })
  @IsUUID()
  uuid: string;

  @Field({ nullable: true })
  @MinLength(3)
  @MaxLength(255)
  @IsString()
  @IsOptional()
  name?: string;

  @Field({ nullable: true })
  @MinLength(3)
  @MaxLength(255)
  @IsString()
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}

/**
 * DeleteTeamArgs
 * Delete team for resolver.
 *

 */
@InputType()
export class DeleteTeamArgs {
  @Field({ nullable: false })
  @IsUUID()
  uuid: string;
}

/**
 * AssingUserToTeamArgs
 * Assign user to team for resolver.
 *

 */
@InputType()
export class AssingUserToTeamArgs {
  @Field({ nullable: false })
  @IsUUID()
  team: string;

  @Field({ nullable: false })
  @IsUUID()
  user: string;
}

/**
 * UnAssingUserToTeamArgs
 * UnAssign user to team for resolver.
 *

 */
@InputType()
export class UnAssingUserToTeamArgs {
  @Field({ nullable: false })
  @IsUUID()
  team: string;

  @Field({ nullable: false })
  @IsUUID()
  user: string;
}

/**
 * DetailsTeamsArgs
 * Get detials team for resolver.
 *

 */
@InputType()
export class DetailsTeamsArgs {
  @Field({ nullable: false })
  @IsUUID()
  uuid: string;
}
