import { IsNull } from 'typeorm';
import { Cache } from 'cache-manager';
import { Projects } from '../entities/projects.entity';
import { AclGuard } from '../../core/guards/acl.guard';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ProjectsService } from '../entities/projects.service';
import { BaseResolver } from '../../core/graphql/base.resolver';
import { Users } from '../../authorization/entities/users.entity';
import { UseGuards, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Args, Query, Resolver, Mutation, Subscription } from '@nestjs/graphql';
import { CustomException } from '../../../support/handlers/custom.handler';
import {
  PubSubInterface,
  OffsetTypeInterface,
  OrderByTypeInterface,
  ProjectTypeInterface,
  ResponseEndpointInterface,
  FiltersCriteriaTypeInterface,
} from '../../../support/interfaces';
import {
  ProjectsListArgs,
  CreateProjectArgs,
  UpdateProjectArgs,
  DeleteProjectArgs,
  DetailsProjectArgs,
} from './projects.args';
import { TeamsService } from '../../teams/entities/teams.service';
import { ProjectResponseType, ProjectsResponseType } from './projects.types';
import { CurrentLoggedUser } from '../../../support/decorators/logged.user.decorator';

@Resolver()
export class ProjectsResolver extends BaseResolver {
  /**
   * @var String cacheName
   */
  public static cacheName = 'PROJECTS_CACHE';

  /**
   * Constructor of class.
   * @param TeamsService teamsService
   * @param ProjectsService projectsService
   * @param PubSubInterface pubSub
   * @param Cache cacheManager
   */
  constructor(
    private teamsService: TeamsService,
    private projectsService: ProjectsService,
    @Inject('PUB_SUB') private pubSub: PubSubInterface,
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
  ) {
    super();
  }

  /**
   * Method to handle subscription.
   * @return AsyncIterator<unknown, any, undefined>
   */
  @Subscription(() => ProjectsResponseType, {
    name: 'projectsList',
  })
  handleSubscription(
    empty,
    _,
    context,
  ): AsyncIterator<unknown, any, undefined> {
    return this.pubSub.asyncIterator(
      `channelhHandleProjectsSubscription_${context.connection.context.loggedUser.account.id}`,
    );
  }

  /**
   * Method to get projects list.
   * @param Users loggedUser
   * @param ProjectsListArgs params
   * @return Promise<ResponseEndpointInterface>
   */
  @Query(() => ProjectsResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('get_projects_list'))
  public async projectsList(
    @CurrentLoggedUser() loggedUser: Users,
    @Args('params') params: ProjectsListArgs,
  ): Promise<ResponseEndpointInterface> {
    let records = this.getRecordsOrderByField(
      this.getRecordsFilteredByFilterCriteria(
        await this.getRecordsFromCache(loggedUser, this.projectsService, {
          account: loggedUser.account.id,
          deleted_at: IsNull(),
        }),
        params.filters as Array<FiltersCriteriaTypeInterface>,
      ),
      params.order as OrderByTypeInterface,
    );

    records = this.filterRecordsByTeams(records, loggedUser);
    return {
      total: records.length,
      page: params?.offset?.page,
      records: this.getRecordsForPage(
        records,
        params.offset as OffsetTypeInterface,
      ),
    };
  }

  /**
   * Method to get project detials.
   * @param DetailsUsersArgs params
   * @param Users loggedUser
   * @return Promise<ResponseEndpointInterface>
   */
  @Query(() => ProjectResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('detials_project'))
  async getDetailsProject(
    @Args('params') params: DetailsProjectArgs,
    @CurrentLoggedUser() loggedUser: Users,
  ): Promise<ResponseEndpointInterface> {
    const { record } = await this.getProjectRecordByUuid(
      params.uuid,
      loggedUser,
    );
    const teams = loggedUser.teams.map(team => team.id);
    if (record?.team && !teams.includes(record?.team.id) && !record.is_global) {
      throw new CustomException(`notExists`);
    }

    return {
      total: 1,
      record,
    };
  }

  /**
   * Method to delete project.
   * @param DeleteProjectArgs params
   * @param Users loggedUser
   * @return Promise<ResponseEndpointInterface>
   */
  @Mutation(() => ProjectResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('delete_project'))
  async deleteProject(
    @Args('params') params: DeleteProjectArgs,
    @CurrentLoggedUser() loggedUser: Users,
  ): Promise<ResponseEndpointInterface> {
    const { record, cache } = await this.getProjectRecordByUuid(
      params.uuid,
      loggedUser,
    );
    const teams = loggedUser.teams.map(team => team.id);

    if (record.team && !teams.includes(record.team.id) && !record.is_global) {
      throw new CustomException(`notExists`);
    }

    this.projectsService.deleteProject(record.uuid);
    const records = cache.filter(project => project.uuid != params.uuid);
    this.cacheManager.set(this.getCacheName(loggedUser), records, null);

    this.publishSubscription(records, loggedUser);

    return {
      total: 1,
      record,
    };
  }

  /**
   * Method to create new project.
   * @params CreateProjectArgs params
   * @param Users loggedUser
   * @return Promise<Users>
   */
  @Mutation(() => ProjectResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('create_project'))
  public async createProject(
    @Args('params') params: CreateProjectArgs,
    @CurrentLoggedUser() loggedUser: Users,
  ): Promise<ResponseEndpointInterface> {
    let recordTeam = null;
    if (params.team) {
      const { record } = await this.getOneRecordFromCache(
        params.team,
        loggedUser,
        async () =>
          await this.setRecordsToCache(
            loggedUser,
            this.teamsService,
            {
              account: loggedUser.account.id,
              deleted_at: IsNull(),
            },
            'TEAMS_CACHE',
          ),
        'TEAMS_CACHE',
      );

      params.team = record.id;
      recordTeam = record;
    }

    params.team = params.is_global ? null : params.team;
    const newCreatedProject = await this.projectsService.createProject({
      ...params,
      account: loggedUser.account.id,
    } as ProjectTypeInterface);

    const cache = await this.getRecordsFromCache(
      loggedUser,
      this.projectsService,
      {
        account: loggedUser.account.id,
        deleted_at: IsNull(),
      },
    );

    newCreatedProject.team =
      recordTeam && !params.is_global ? recordTeam : null;
    if (!cache.find(record => record.id === newCreatedProject.id)) {
      cache.unshift(newCreatedProject);
    }

    this.publishSubscription(cache, loggedUser);

    return {
      total: 1,
      record: newCreatedProject,
    };
  }

  /**
   * Method to update project.
   * @params UpdateProjectArgs params
   * @param Users loggedUser
   * @return Promise<Users>
   */
  @Mutation(() => ProjectResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('update_project'))
  public async updateProject(
    @Args('params') params: UpdateProjectArgs,
    @CurrentLoggedUser() loggedUser: Users,
  ): Promise<ResponseEndpointInterface> {
    const projectParams = await this.getProjectRecordByUuid(
      params.uuid,
      loggedUser,
    );

    let recordTeam = null;
    if (params.team) {
      const { record } = await this.getOneRecordFromCache(
        params.team,
        loggedUser,
        async () =>
          await this.setRecordsToCache(
            loggedUser,
            this.teamsService,
            {
              account: loggedUser.account.id,
              deleted_at: IsNull(),
            },
            'TEAMS_CACHE',
          ),
        'TEAMS_CACHE',
      );

      params.team = record.id;
      recordTeam = record;
    }

    params.team = params.is_global ? null : params.team;

    const updatedRecord = await this.projectsService.updateProject(
      projectParams.record,
      params,
    );

    const cache = await this.getRecordsFromCache(
      loggedUser,
      this.projectsService,
      {
        account: loggedUser.account.id,
        deleted_at: IsNull(),
      },
    );

    if (recordTeam && !params.is_global) {
      params.team = recordTeam;
      updatedRecord.team = recordTeam;
    }

    const records = cache.map(project => {
      if (project.uuid === params.uuid) {
        project = {
          ...project,
          ...params,
        };
      }
      return project;
    });
    this.cacheManager.set(this.getCacheName(loggedUser), records, null);
    this.publishSubscription(records, loggedUser);

    return {
      total: 1,
      record: updatedRecord,
    };
  }

  /**
   * Method to get one record project by uuid.
   * @param string uuid
   * @param Users loggedUser
   * @return Promise<{ record: Projects; cache }>
   */
  private async getProjectRecordByUuid(
    uuid: string,
    loggedUser: Users,
  ): Promise<{ record: Projects; cache }> {
    return await this.getOneRecordFromCache(
      uuid,
      loggedUser,
      async () =>
        await this.setRecordsToCache(loggedUser, this.projectsService, {
          account: loggedUser.account.id,
          deleted_at: IsNull(),
        }),
    );
  }

  /**
   * Method to publish subscription.
   * @param Array<Projects> records
   */
  private publishSubscription(
    records: Array<Projects>,
    loggedUser: Users,
  ): void {
    this.pubSub.publish(
      `channelhHandleProjectsSubscription_${loggedUser.account.id}`,
      {
        projectsList: {
          total: records.length,
          page: 1,
          records: this.getRecordsForPage(records, null),
        },
      },
    );
  }

  /**
   * Method to filter records by teams.
   * @param Array<Projects> records
   * @param Users loggedUser
   * @return Array<Projects>
   */
  private filterRecordsByTeams(
    records: Array<Projects>,
    loggedUser: Users,
  ): Array<Projects> {
    const setFilterByTeams = !loggedUser.profile.privilages.includes(
      'get_all_projects_list',
    );
    const teams = loggedUser.teams.map(team => team.id);
    return setFilterByTeams
      ? records.filter(
          project => teams.includes(project.team?.id) || project.is_global,
        )
      : records;
  }
}
