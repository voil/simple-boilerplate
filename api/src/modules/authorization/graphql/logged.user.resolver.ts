import { UseGuards } from '@nestjs/common';
import { Users } from '../entities/users.entity';
import * as secureSession from 'fastify-secure-session';
import { AuthGuard } from '../../core/guards/auth.guard';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoggedUserResponseType } from './logged.user.types';
import { Session } from '../../../support/decorators/session.decorator';
import { ResponseEndpointInterface } from '../../../support/interfaces';
import { UsersSessionsService } from '../entities/users.sessions.service';
import { CurrentLoggedUser } from '../../../support/decorators/logged.user.decorator';

/**
 * LoggedUserResolverResolver
 * Logged user resolver.
 *

 */
@Resolver()
export class LoggedUserResolver {
  /**
   * Constructor of class.
   */
  constructor(private usersSessionsService: UsersSessionsService) {
    // ...
  }

  /**
   * Method to get logged user.
   * @param Users loggedUser
   * @return Promise<ResponseEndpointInterface>
   */
  @Query(() => LoggedUserResponseType)
  @UseGuards(AuthGuard)
  async getLoggedUser(
    @CurrentLoggedUser() loggedUser: Users,
  ): Promise<ResponseEndpointInterface> {
    return {
      total: 1,
      record: loggedUser,
    };
  }

  /**
   * Method to get logout user.
   * @param Users loggedUser
   * @param secureSession.Session session
   * @return Promise<ResponseEndpointInterface>
   */
  @Mutation(() => LoggedUserResponseType)
  @UseGuards(AuthGuard)
  async logoutFromPlatform(
    @CurrentLoggedUser() loggedUser: Users,
    @Session() session: Record<string, any>,
  ): Promise<ResponseEndpointInterface> {
    delete session.currentLoggedUserToken;
    delete session.currentLoggedUser;
    this.usersSessionsService.deleteSession(loggedUser);

    return {
      total: 1,
      record: loggedUser,
    };
  }
}
