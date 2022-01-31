import * as bcrypt from 'bcrypt';
import { LoginArgs } from './login.args';
import { LoginType } from './login.types';
import { hCryptString } from '../../../support/helpers';
import { UsersService } from '../entities/users.service';
import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { Session } from '../../../support/decorators/session.decorator';
import { Req } from '@nestjs/common';
import { UsersSessionsService } from '../entities/users.sessions.service';
import { CustomException } from '../../../support/handlers/custom.handler';
import { Constants } from '../../../support/constants';

/**
 * LoginResolver
 * Login resolver.
 */
@Resolver()
export class LoginResolver {
  /**
   * Constructor of class.
   * @params UsersService usersService
   * @params UsersSessionsService usersSessionService
   */
  constructor(
    private usersService: UsersService,
    private usersSessionService: UsersSessionsService
  ) {}

  /**
   * Method to login to platform.
   * @param LoginArgs params
   * @return Promise<{ access_token: string }>
   */
  @Mutation(() => LoginType)
  async loginToPlatform(
    @Args('params') params: LoginArgs,
    @Req() request: any,
    @Session() session: Record<string, any>,
  ): Promise<{ state: boolean }> {
    const user = await this.usersService.getUserByParams({
      email: params.email,
    });
    const isMatch = await bcrypt.compare(
      params.password,
      user.password.trim() || null,
    );

    if (!user || !isMatch || !user.account.is_active) {
      throw new CustomException('wrong login or password');
    }

    const sessionCreated = await this.usersSessionService.createSession(user);
    session.currentLoggedUserToken = hCryptString(`${sessionCreated.uuid}|${user.id}`);

    session.save();
    return { state: true };
  }
}
