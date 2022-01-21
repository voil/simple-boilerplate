import * as moment from 'moment';
import { MoreThan, LessThan } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { Constants, DefaultProfileParams } from '../../../support/constants';
import { UsersService } from '../entities/users.service';
import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { ProfilesService } from '../entities/profiles.service';
import { RegisterRequestsType } from './register.requests.types';
import { ConfigService } from '../../core/services/config.service';
import {
  ProfilesTypeInterface,
  RegisterRequestInterface,
} from '../../../support/interfaces';
import { RegisterRequests } from '../entities/register.requests.entity';
import { UsersAccountsService } from '../entities/users.accounts.service';
import { CustomException } from '../../../support/handlers/custom.handler';
import { RegisterRequestsService } from '../entities/register.requests.service';
import {
  CreateRegisterRequestsArgs,
  ActiveRegisterRequestsArgs,
} from './register.requests.args';

/**
 * RegisterRequestsResolver
 * Register requests resolver.
 *

 */
@Resolver()
export class RegisterRequestsResolver {
  /**
   * Constructor of class.
   * @params UsersService usersService
   * @params ConfigService configService
   * @params MailerService mailerService
   * @params ProfilesService profilesService
   * @params UsersAccountsService usersAccountsService
   * @params RegisterRequestsService registerRequestsService
   */
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    private mailerService: MailerService,
    private profilesService: ProfilesService,
    private usersAccountsService: UsersAccountsService,
    private registerRequestsService: RegisterRequestsService,
  ) {}

  /**
   * Method to create register request.
   * @param CreateRegisterRequestsArgs params
   * @return Promise<RegisterRequests>
   */
  @Mutation(() => RegisterRequestsType)
  async createRegisterRequest(
    @Args('params') params: CreateRegisterRequestsArgs,
  ): Promise<RegisterRequests> {
    await this.registerRequestsService.closeOldRegisterRequests({
      email: params.email,
      actived_at: MoreThan(moment().format(Constants.DATETIME_FORMAT)),
    });

    const language = params.language;
    delete params.language;

    const registerRequest = await this.registerRequestsService.createRegisterRequest(
      {
        name_and_surname: params.name_and_surname,
        password: params.password,
        email: params.email
      } as RegisterRequestInterface,
    );
    await this.mailerService.sendMail({
      to: params.email,
      subject: `Dokończenie rejestracji do platformy ${this.configService.get(
        'PLATFORM_NAME',
      )}`,
      template: `register.${language}.template.ejs`,
      context: {
        code: `${this.configService.get(
          'PLATFORM_DOMAIN',
        )}/authentication/registration/activation/${registerRequest.uuid}`,
      },
    }).catch(() => {
      throw new CustomException(
        `Email sending error. Please try again in a moment.`,
      );
    });
    return registerRequest;
  }

  /**
   * Method to active register request.
   * @param ActiveRegisterRequestsArgs params
   * @return Promise<RegisterRequests>
   */
  @Mutation(() => RegisterRequestsType)
  async activeRegisterRequest(
    @Args('params') params: ActiveRegisterRequestsArgs,
  ): Promise<RegisterRequests> {
    await this.registerRequestsService.closeOldRegisterRequests({
      actived_at: LessThan(moment().format(Constants.DATETIME_FORMAT)),
    });

    const registerRequest = await this.registerRequestsService.getRegisterRequestByUuid(
      params.uuid,
      {
        is_active: true,
        actived_at: MoreThan(moment().format(Constants.DATETIME_FORMAT)),
      },
    );

    if (!registerRequest) {
      throw new CustomException(
        `Register request '${params.uuid}' not exists.`,
      );
    }

    const accountID = (await this.usersAccountsService.createUserAccount()).id;

    await this.usersService.createUser({
      name_and_surname: registerRequest.name_and_surname,
      email: registerRequest.email,
      password: registerRequest.password,
      account: accountID,
      profile: (
        await this.profilesService.createProfile({
          ...DefaultProfileParams,
          account: accountID,
        } as ProfilesTypeInterface)
      ).id,
    });

    await this.registerRequestsService.closeOldRegisterRequests({
      email: registerRequest.email,
    });

    return registerRequest;
  }
}
