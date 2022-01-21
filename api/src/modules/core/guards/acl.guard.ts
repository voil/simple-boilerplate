import { CanActivate, Injectable } from '@nestjs/common';
import { AccessException } from '../../../support/handlers/access.handler';

/**
 * AclGuard
 * Acl guard check is user has access to endpoint.
 *
 * @implements CanActivate

 */
@Injectable()
export class AclGuard implements CanActivate {
  /**
   * Constructor of class.
   * @param JwtService jwtService
   */
  constructor(private nameOfAccessGuard: string) {}

  /**
   * Method to handle authorization guard.
   * @param ExecutionContext context
   * @return Promise<boolean>
   */
  async canActivate(context): Promise<boolean> {
    try {
      if (!context.args[2]
        .req.session.currentLoggedUser.profile.privilages.includes(this.nameOfAccessGuard)) {
        throw new Error();
      }
      return true;
    } catch (error) {
      throw new AccessException();
    }
  }
}
