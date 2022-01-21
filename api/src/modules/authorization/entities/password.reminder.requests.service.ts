import * as moment from 'moment';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectLiteral } from 'typeorm';
import { PasswordReminderRequests } from './password.reminder.requests.entity';

/**
 * PasswordReminderRequestsService
 * Password reminder requests service.
 *

 */
export class PasswordReminderRequestsService {
  /**
   * Constructor of class.
   * @params Repository<PasswordReminderRequests> passwordReminderRequestsRepository
   */
  constructor(
    @InjectRepository(PasswordReminderRequests)
    private passwordReminderRequestsRepository: Repository<
      PasswordReminderRequests
    >,
  ) {}

  /**
   * Method for create new password reminder requests
   * @params Users user
   * @return Promise<PasswordReminderRequests>
   */
  public async createPasswordReminderRequest(
    user: Users,
  ): Promise<PasswordReminderRequests> {
    return await this.passwordReminderRequestsRepository.save(
      Object.assign(new PasswordReminderRequests(), {
        is_active: true,
        user: user.id,
        actived_at: moment().add(1, 'days'),
      }),
    );
  }

  /**
   * Method to get password reminder request by uuid.
   * @params String uuid
   * @params ObjectLiteral where
   * @return Promise<PasswordReminderRequests | null>
   */
  public async getPasswordReminderRequestByUuid(
    uuid: string,
    where: ObjectLiteral = {},
  ): Promise<PasswordReminderRequests | null> {
    const record = await this.passwordReminderRequestsRepository.find({
      where: {
        uuid,
        ...where,
      },
      relations: ['user'],
    });

    return record[0] || null;
  }

  /**
   * Method to close old password reminder requests.
   * @params ObjectLiteral where
   * @return Promise<void>
   */
  public async closeOldPasswordReminderRequests(
    where: ObjectLiteral = {},
  ): Promise<void> {
    await this.passwordReminderRequestsRepository.update(
      {
        is_active: true,
        ...where,
      },
      {
        is_active: false,
        updated_at: moment().format('Y-MM-D H:mm:s'),
      },
    );
  }
}
