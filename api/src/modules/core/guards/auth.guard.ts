import * as moment from 'moment';
import { getRepository, MoreThan } from 'typeorm';
import { CanActivate, Injectable } from '@nestjs/common';
import { hDecryptString } from '../../../support/helpers';
import { ForbiddenException } from '../../../support/handlers/forbidden.handler';
import { UsersSessions } from '../../authorization/entities/users.sessions.entity';

/**
 * AuthGuard
 * Auth guard to check is user authorize.
 *
 * @implements CanActivate

 */
@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * Constructor of class.
   */
  constructor() {
    // ...
  }

  /**
   * Method to handle authorization guard.
   * @param ExecutionContext context
   * @return Promise<boolean>
   */
  async canActivate(context): Promise<boolean> {
    try {
      if (!context.args[2].req.session.currentLoggedUserToken) {
        throw new Error();
      }

      const unhashed = hDecryptString(
        context.args[2].req.session.currentLoggedUserToken,
      ).split('|');
      const sessionsUser = getRepository(UsersSessions);

      const session = await sessionsUser.find({
        where: {
          user: unhashed[1],
          uuid: unhashed[0],
          actived_to: MoreThan(moment().format('Y-MM-D H:mm:s')),
        },
        relations: ['user', 'user.profile', 'user.teams', 'user.account'],
      });
      if (session.length === 0) {
        throw new Error();
      }

      context.args[2].req.session.currentLoggedUser = session[0].user;
      return true;
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
