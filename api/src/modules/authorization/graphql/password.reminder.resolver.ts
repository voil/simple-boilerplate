import * as moment from 'moment';
import { MoreThan, LessThan } from 'typeorm';
import { Constants } from '../../../support/constants';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from '../entities/users.service';
import { PasswordReminderType } from './password.reminder.types';
import { Mutation, Resolver, Args, Query } from '@nestjs/graphql';
import { ConfigService } from '../../core/services/config.service';
import { CustomException } from '../../../support/handlers/custom.handler';
import { PasswordReminderRequests } from '../entities/password.reminder.requests.entity';
import { PasswordReminderRequestsService } from '../entities/password.reminder.requests.service';
import {
  CreatePasswordReminderArgs,
  ActivePasswordReminderRequestsArgs,
  ChangePasswordReminderRequestsArgs,
} from './password.reminder.args';

/**
 * PasswordReminderResolver
 * Password reminder resolver.
 *

 */
@Resolver()
export class PasswordReminderResolver {
  /**
   * Constructor of class.
   * @params UsersService usersService
   * @params ConfigService configService
   * @params MailerService mailerService
   * @params PasswordReminderRequestsService passwordReminderRequestsService
   */
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private mailerService: MailerService,
    private passwordReminderRequestsService: PasswordReminderRequestsService,
  ) {}

  /**
   * Method to create password reminder request.
   * @param CreatePasswordReminderArgs params
   * @return Promise<PasswordReminderRequests>
   */
  @Mutation(() => PasswordReminderType)
  async createPasswordReminderRequest(
    @Args('params') params: CreatePasswordReminderArgs,
  ): Promise<PasswordReminderRequests> {
    const user = await this.usersService.getUserByParams({
      email: params.email,
    });
    if (!user || !user.account.is_active) {
      throw new CustomException('user not exists in platform.');
    }
    await this.passwordReminderRequestsService.closeOldPasswordReminderRequests(
      {
        user: user.id,
        actived_at: MoreThan(moment().format(Constants.DATETIME_FORMAT)),
      },
    );
    const passwordReminder = await this.passwordReminderRequestsService.createPasswordReminderRequest(
      user,
    );

    await this.mailerService.sendMail({
      to: user.email,
      subject: `Zmiana hasła do platformy ${this.configService.get(
        'PLATFORM_NAME',
      )}`,
      template: `password.reminder.${params.language}.template.ejs`,
      context: {
        code: `${this.configService.get(
          'PLATFORM_DOMAIN',
        )}/authentication/forgot/change/${passwordReminder.uuid}`,
      },
    }).catch((error) => {
      throw new CustomException(
        `Email sending error. Please try again in a moment.`,
      );
    });
    return passwordReminder;
  }

  /**
   * Method to active password reminder request.
   * @param ActivePasswordReminderRequestsArgs params
   * @return Promise<PasswordReminderRequests>
   */
  @Query(() => PasswordReminderType)
  async checkIsActivePasswordReminderRequest(
    @Args('params') params: ActivePasswordReminderRequestsArgs,
  ): Promise<PasswordReminderRequests> {
    await this.passwordReminderRequestsService.closeOldPasswordReminderRequests(
      {
        is_active: true,
        actived_at: LessThan(moment().format(Constants.DATETIME_FORMAT)),
      },
    );

    const passwordReminderRequest = await this.passwordReminderRequestsService.getPasswordReminderRequestByUuid(
      params.uuid,
      {
        is_active: true,
        actived_at: MoreThan(moment().format(Constants.DATETIME_FORMAT)),
      },
    );

    if (!passwordReminderRequest) {
      throw new CustomException(
        `Password reminder request '${params.uuid}' not exists.`,
      );
    }

    return passwordReminderRequest;
  }

  /**
   * Method to change password for user.
   * @param ChangePasswordReminderRequestsArgs params
   * @return Promise<PasswordReminderRequests>
   */
  @Mutation(() => PasswordReminderType)
  async changePasswordReminderRequest(
    @Args('params') params: ChangePasswordReminderRequestsArgs,
  ): Promise<PasswordReminderRequests> {
    const passwordReminderRequest = await this.passwordReminderRequestsService.getPasswordReminderRequestByUuid(
      params.uuid,
      {
        is_active: true,
        actived_at: MoreThan(moment().format(Constants.DATETIME_FORMAT)),
      },
    );

    if (!passwordReminderRequest) {
      throw new CustomException(
        `Password reminder request '${params.uuid}' not exists.`,
      );
    }

    this.usersService.changePasswordForUserByUuid(
      passwordReminderRequest.user.uuid,
      params.password,
    );

    await this.passwordReminderRequestsService.closeOldPasswordReminderRequests(
      {
        uuid: passwordReminderRequest.uuid,
      },
    );

    return passwordReminderRequest;
  }
}
