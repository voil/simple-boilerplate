import { Module } from '@nestjs/common';
import type { ClientOpts } from 'redis';
import { MailModule } from './mail.module';
import { CacheModule } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { DatabaseModule } from './database.module';
import { EndpointsModule } from './endpoints.module';
import { EntityModule } from './entities/entites.module';
import { EmptyResolver } from './graphql/empty.resolver';
import { ConfigService } from './services/config.service';
import { CheckIsExists } from '../../support/validators/is.exists.validator';
import * as redisStore from 'cache-manager-redis-store';

/**
 * CoreModule
 * Core module.
 *

 */
@Module({
  imports: [
    ConfigModule.register(),
    MailModule,
    DatabaseModule,
    CacheModule.registerAsync({
      imports: [ConfigModule.register()],
      useFactory: async (configService: ConfigService) => {
        return  {
          ttl: 60,
          store: redisStore,
          host: configService.get('REDIS_HOST'),
          port: parseInt(configService.get('REDIS_PORT'), 10),
        };
      },
      inject: [ConfigService],
    }),
    EntityModule,
    EndpointsModule,
  ],
  providers: [EmptyResolver, CheckIsExists],
})
export class CoreModule {}
