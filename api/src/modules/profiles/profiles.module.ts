import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Teams } from './entities/teams.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { ConfigModule } from '../core/config.module';
import { Profiles } from './entities/profiles.entity';
import { UsersService } from './entities/users.service';
import { ProfilesService } from './entities/profiles.service';
import { ProfilesResolver } from './graphql/profiles.resolver';
import { UsersAccounts } from './entities/users.accounts.entity';

/**
 * ProfilesModule
 * Profiles module.
 *

 */
@Module({
  imports: [
    ConfigModule.register(),
    CacheModule.register({
      ttl: 60,
    }),
    TypeOrmModule.forFeature([Profiles, UsersAccounts, Users, Teams]),
  ],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    UsersService,
    ProfilesService,
    ProfilesResolver,
  ],
})
export class ProfilesModule {}
