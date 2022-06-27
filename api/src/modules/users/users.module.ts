import { IsNull } from 'typeorm';
import { Cache } from 'cache-manager';
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
import { ConfigService } from '../core/services/config.service';
import { UsersSessions } from './entities/users.sessions.entity';
import { UsersAccounts } from './entities/users.accounts.entity';
import * as redisStore from 'cache-manager-redis-store';
import { UsersAccountsService } from './entities/users.accounts.service';
import {CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';

/**
 * UsersModule
 * Users module.
 *

 */
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule.register()],
      useFactory: async (configService: ConfigService) => {
        return  {
          ttl: 60,
          // store: redisStore,
          // host: configService.get('REDIS_HOST'),
          // port: parseInt(configService.get('REDIS_PORT'), 10),
        };
      },
      inject: [ConfigService],
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
    UsersAccountsService,
  ],
})
export class UsersModule {
  constructor(
    protected usersService: UsersService,
    protected usersAccountsService: UsersAccountsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {
    (async () => {
      const response = await this.usersAccountsService.getList();
      response.forEach(async item => {
        await this.cacheManager.set(
          `USERS_CACHE_${item.id}`,
          await usersService.getList({
            account: item.id,
            deleted_at: IsNull(),
          }),
          null,
        );
        console.log(`CACHE USERS FOR ACCOUNT ${item.id} SET`);
      });
    })();
  }
}
