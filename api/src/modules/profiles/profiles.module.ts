import { Cache } from 'cache-manager';
import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Teams } from './entities/teams.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { ConfigModule } from '../core/config.module';
import { Profiles } from './entities/profiles.entity';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { UsersService } from './entities/users.service';
import { ProfilesService } from './entities/profiles.service';
import { ProfilesResolver } from './graphql/profiles.resolver';
import { ConfigService } from '../core/services/config.service';
import { UsersAccounts } from './entities/users.accounts.entity';
import { UsersAccountsService } from './entities/users.accounts.service';

/**
 * ProfilesModule
 * Profiles module.
 */
@Module({
  imports: [
    ConfigModule.register(),
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
    UsersAccountsService
  ],
})
export class ProfilesModule {
  /**
   * @var String
   */
   #nameCache: string = 'PROFILES_CACHE_';

   /**
    * Constructor of class
    * @param UsersService usersService
    * @param UsersAccountsService usersAccountsService
    * @param Cache cacheManager
    */
   constructor(
     protected profilesService: ProfilesService,
     protected usersAccountsService: UsersAccountsService,
     @Inject(CACHE_MANAGER) private cacheManager: Cache
     ) {
     (async () => {
       const response = await this.usersAccountsService.getList();
       response.forEach(async item => {
         await this.cacheManager.set(
           `${this.#nameCache}${item.id}`,
           await profilesService.getList({
             account: item.id,
           }),
           null,
         );
         console.log('\x1b[36m%s\x1b[0m', `CACHE PROFILES FOR ACCOUNT ${item.id} SET`);
       });
     })();
   }
}
