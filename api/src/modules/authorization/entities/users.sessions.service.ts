import * as moment from 'moment';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Constants } from '../../../support/constants';
import { UsersSessions } from '../entities/users.sessions.entity';

/**
 * UsersSessionsService
 * Users sessions serivce.
 *

 */
export class UsersSessionsService {
  /**
   * Constructor of class.
   * @params Repository<UsersSessions> usersSessionRepository
   */
  constructor(
    @InjectRepository(UsersSessions)
    private usersSessionRepository: Repository<UsersSessions>,
  ) {}

  /**
   * Method to delete user sessions.
   * @params Users user
   * @return Promise<void>
   */
  public async deleteSession(user: Users): Promise<void> {
    this.usersSessionRepository.delete({ user });
  }

  /**
   * Method to create use session.
   * @params Users user
   * @return Promise<UsersSessions>
   */
  public async createSession(user: Users): Promise<UsersSessions> {
    this.usersSessionRepository.delete({ user });
    const session = Object.assign(new UsersSessions(), {
      user: user.id,
      account: user.account.id,
      actived_to: moment().add(Constants.SESSION_EXPIRES, 'minutes'),
    });
    return await this.usersSessionRepository.save(session);
  }
}
