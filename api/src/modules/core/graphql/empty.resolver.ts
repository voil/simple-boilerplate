import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { Query, Resolver, Mutation, registerEnumType } from '@nestjs/graphql';

/**
 * EmptyResolver
 * Empty resolver to start graphql scheme.
 *

 */
@Resolver()
export class EmptyResolver {
  @Query(() => String)
  @UseGuards(AuthGuard)
  empty(): string {
    return 'Hello World!';
  }
}
