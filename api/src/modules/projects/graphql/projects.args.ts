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
 * ProjectsListArgs
 * Projects list arguments for resolver.
 *

 */
@InputType()
export class ProjectsListArgs extends RecordsListArgs() {}

/**
 * DeleteProjectArgs
 * Delete project for resolver.
 *

 */
@InputType()
export class DeleteProjectArgs {
  @Field({ nullable: false })
  @IsUUID()
  uuid: string;
}

/**
 * DetailsProjectArgs
 * Get detials project for resolver.
 *

 */
@InputType()
export class DetailsProjectArgs {
  @Field({ nullable: false })
  @IsUUID()
  uuid: string;
}

/**
 * CreateProjectArgs
 * Create project for resolver.
 *

 */
 @InputType()
 export class CreateProjectArgs {
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

   @Field({ nullable: true })
   @IsUUID()
   @IsOptional()
   team?: string;

   @Field({ nullable: false })
   @IsBoolean()
   is_global?: boolean;
 }

 /**
 * UpdateProjectArgs
 * Create project for resolver.
 *

 */
  @InputType()
  export class UpdateProjectArgs {
    @Field({ nullable: false })
    @IsUUID()
    uuid: string;

    @Field({ nullable: true })
    @MinLength(3)
    @MaxLength(255)
    @IsString()
    @IsOptional()
    name: string;
  
    @Field({ nullable: true })
    @MinLength(3)
    @MaxLength(255)
    @IsString()
    @IsOptional()
    description: string;
 
    @Field({ nullable: true })
    @IsUUID()
    @IsOptional()
    team: string;
 
    @Field({ nullable: true })
    @IsBoolean()
    @IsOptional()
    is_global?: boolean;

    @Field({ nullable: true })
    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
  }
 