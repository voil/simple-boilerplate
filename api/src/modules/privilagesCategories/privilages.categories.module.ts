import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../core/config.module';
import { PrivilageType } from './entities/privilages.types.entity';
import { PrivilageCategorie } from './entities/privilages.categories.entity';
import { PrivilagesCategoriesService } from './entities/privilages.categories.service';
import { PrivilagesCategoriesResolver } from './graphql/privilages.categories.resolver';

/**
 * PrivilagesCategoriesModule
 * Privilages categories module.
 *

 */
@Module({
  imports: [
    ConfigModule.register(),
    CacheModule.register({
      ttl: 60,
    }),
    TypeOrmModule.forFeature([PrivilageCategorie, PrivilageType]),
  ],
  providers: [PrivilagesCategoriesService, PrivilagesCategoriesResolver],
})
export class PrivilagesCategoriesModule {}
