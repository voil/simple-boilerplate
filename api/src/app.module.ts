import { Module } from '@nestjs/common';
import { CoreModule } from './modules/core/core.module';
import { UsersModule } from './modules/users/users.module'; 
import { TeamsModule } from './modules/teams/teams.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { PrivilagesCategoriesModule } from './modules/privilagesCategories/privilages.categories.module';

/**
 * AppModule
 * Main app module to start application.
 *
 */
@Module({
  imports: [
    CoreModule,
    UsersModule,
    TeamsModule,
    ProfilesModule,
    ProjectsModule,
    AuthorizationModule,
    PrivilagesCategoriesModule,
  ],
  providers: [],
})
export class AppModule {}
