import { Module } from '@nestjs/common';
import { Teams } from './entities/teams.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { ConfigModule } from '../core/config.module';
import { Profiles } from './entities/profiles.entity';
import { UsersService } from './entities/users.service';
import { LoginResolver } from './graphql/login.resolver';
import { ProfilesService } from './entities/profiles.service';
import { UsersAccounts } from './entities/users.accounts.entity';
import { UsersSessions } from './entities/users.sessions.entity';
import { LoggedUserResolver } from './graphql/logged.user.resolver';
import { RegisterRequests } from './entities/register.requests.entity';
import { UsersAccountsService } from './entities/users.accounts.service';
import { UsersSessionsService } from './entities/users.sessions.service';
import { RegisterRequestsService } from './entities/register.requests.service';
import { RegisterRequestsResolver } from './graphql/register.requests.resolver';
import { PasswordReminderResolver } from './graphql/password.reminder.resolver';
import { PasswordReminderRequests } from './entities/password.reminder.requests.entity';
import { PasswordReminderRequestsService } from './entities/password.reminder.requests.service';

/**
 * AuthorizationModule
 * Authorization module.
 *
 */
@Module({
  imports: [
    ConfigModule.register(),
    TypeOrmModule.forFeature([
      Users,
      Teams,
      Profiles,
      UsersSessions,
      UsersAccounts,
      RegisterRequests,
      PasswordReminderRequests,
    ]),
  ],
  providers: [
    UsersService,
    LoginResolver,
    ProfilesService,
    LoggedUserResolver,
    UsersAccountsService,
    UsersSessionsService,
    RegisterRequestsService,
    PasswordReminderResolver,
    RegisterRequestsResolver,
    PasswordReminderRequestsService,
  ],
})
export class AuthorizationModule {}
