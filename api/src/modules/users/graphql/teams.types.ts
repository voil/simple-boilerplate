import { Field, ObjectType } from '@nestjs/graphql';

/**
 * UserTeamsType
 * User teams types.
 *

 */
 @ObjectType()
 export class UserTeamsType {
   @Field(type => String, { description: `Unique uuid identificator.` })
   uuid: string;
 
   @Field(type => String, { description: `Name of team.` })
   name?: string;
 }