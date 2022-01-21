import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Teams } from './entities/teams.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { ConfigModule } from '../core/config.module';
import { Profiles } from './entities/profiles.entity';
import { UsersService } from './entities/users.service';
import { UsersResolver } from './graphql/users.resolver';
import { ProfilesService } from './entities/profiles.service';
import { UsersSessions } from './entities/users.sessions.entity';
import { UsersAccounts } from './entities/users.accounts.entity';

/**
 * UsersModule
 * Users module.
 *

 */
@Module({
  imports: [
    ConfigModule.register(),
    CacheModule.register({
      ttl: 60,
    }),
    TypeOrmModule.forFeature([
      Teams,
      Users,
      Profiles,
      UsersAccounts,
      UsersSessions,
    ]),
  ],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    UsersService,
    UsersResolver,
    ProfilesService,
  ],
})
export class UsersModule {}
