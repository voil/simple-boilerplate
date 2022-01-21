import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { Teams } from './entities/teams.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../core/config.module';
import { Projects } from './entities/projects.entity';
import { TeamsService } from './entities/teams.service';
import { ProjectsService } from './entities/projects.service';
import { ProjectsResolver } from './graphql/projects.resolver';
import { UsersAccounts } from './entities/users.accounts.entity';

/**
 * ProjectsModule
 * Projects module.
 *

 */
@Module({
  imports: [
    ConfigModule.register(),
    CacheModule.register({
      ttl: 60,
    }),
    TypeOrmModule.forFeature([Teams, Projects, UsersAccounts]),
  ],
  providers: [
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    TeamsService,
    ProjectsService,
    ProjectsResolver,
  ],
})
export class ProjectsModule {}
