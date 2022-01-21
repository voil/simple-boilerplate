import { Module } from '@nestjs/common';
import { MailModule } from './mail.module';
import { CacheModule } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { DatabaseModule } from './database.module';
import { EndpointsModule } from './endpoints.module';
import { EntityModule } from './entities/entites.module';
import { EmptyResolver } from './graphql/empty.resolver';
import { CheckIsExists } from '../../support/validators/is.exists.validator';

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
    CacheModule.register({
      ttl: 60,
    }),
    EntityModule,
    EndpointsModule,
  ],
  providers: [EmptyResolver, CheckIsExists],
})
export class CoreModule {}
