import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Teams } from './entities/teams.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { ConfigModule } from '../core/config.module';
import { Profiles } from './entities/profiles.entity';
import { TeamsService } from './entities/teams.service';
import { UsersService } from './entities/users.service';
import { TeamsResolver } from './graphql/teams.resolver';
import { UsersAccounts } from './entities/users.accounts.entity';
import { TeamsHasUsers } from './entities/teams.has.users.entity';

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
      TeamsHasUsers,
    ]),
  ],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    TeamsService,
    UsersService,
    TeamsResolver,
  ],
})
export class TeamsModule {}
