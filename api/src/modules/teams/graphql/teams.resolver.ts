import { IsNull } from 'typeorm';
import { Cache } from 'cache-manager';
import { Teams } from '../entities/teams.entity';
import { AclGuard } from '../../core/guards/acl.guard';
import { AuthGuard } from '../../core/guards/auth.guard';
import { UsersService } from '../entities/users.service';
import { TeamsService } from '../entities/teams.service';
import { BaseResolver } from '../../core/graphql/base.resolver';
import { Users } from '../../authorization/entities/users.entity';
import { TeamResponseType, TeamsResponseType } from './teams.types';
import { CustomException } from '../../../support/handlers/custom.handler';
import {
  PubSubInterface,
  TeamsTypeInterface,
  OffsetTypeInterface,
  OrderByTypeInterface,
  ResponseEndpointInterface,
  FiltersCriteriaTypeInterface,
} from '../../../support/interfaces';
import { UseGuards, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Query, Resolver, Mutation, Args, Subscription } from '@nestjs/graphql';
import {
  TeamsListArgs,
  DeleteTeamArgs,
  UpdateTeamArgs,
  CreateTeamArgs,
  DetailsTeamsArgs,
  AssingUserToTeamArgs,
  UnAssingUserToTeamArgs,
} from '../graphql/teams.args';
import { CurrentLoggedUser } from '../../../support/decorators/logged.user.decorator';

@Resolver()
export class TeamsResolver extends BaseResolver {
  /**
   * @var String cacheName
   */
  public static cacheName = 'TEAMS_CACHE';

  /**
   * Constructor of class.
   * @param TeamsService teamsService
   * @param UsersService usersService
   * @param PubSubInterface pubSub
   * @param Cache cacheManager
   */
  constructor(
    private teamsService: TeamsService,
    private usersService: UsersService,
    @Inject('PUB_SUB') private pubSub: PubSubInterface,
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
  ) {
    super();
  }

  /**
   * Method to handle subscription.
   * @return AsyncIterator<unknown, any, undefined>
   */
  @Subscription(() => TeamsResponseType, {
    name: 'teamsList',
  })
  handleSubscription(
    empty,
    _,
    context,
  ): AsyncIterator<unknown, any, undefined> {
    return this.pubSub.asyncIterator(
      `channelhHandleTeamsSubscription_${context.connection.context.loggedUser.account.id}`,
    );
  }

  /**
   * Method to get users list.
   * @param Users loggedUser
   * @param TeamsListArgs params
   * @return Promise<ResponseEndpointInterface>
   */
  @Query(() => TeamsResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('get_teams_list'))
  public async teamsList(
    @CurrentLoggedUser() loggedUser: Users,
    @Args('params') params: TeamsListArgs,
  ): Promise<ResponseEndpointInterface> {
    const records = this.getRecordsOrderByField(
      this.getRecordsFilteredByFilterCriteria(
        await this.getRecordsFromCache(loggedUser, this.teamsService, {
          account: loggedUser.account.id,
          deleted_at: IsNull(),
        }),
        params.filters as Array<FiltersCriteriaTypeInterface>,
      ),
      params.order as OrderByTypeInterface,
    );

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
   * Method to create new team.
   * @params CreateTeamArgs params
   * @param Users loggedUser
   * @return Promise<Users>
   */
  @Mutation(() => TeamResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('create_team'))
  public async createTeam(
    @Args('params') params: CreateTeamArgs,
    @CurrentLoggedUser() loggedUser: Users,
  ): Promise<ResponseEndpointInterface> {
    const newCreatedTeam = await this.teamsService.createTeam({
      ...params,
      account: loggedUser.account.id,
    } as TeamsTypeInterface);

    const cache = await this.getRecordsFromCache(
      loggedUser,
      this.teamsService,
      {
        account: loggedUser.account.id,
      },
    );

    if (!cache.find(record => record.id === newCreatedTeam.id)) {
      newCreatedTeam.users = [];
      cache.unshift(newCreatedTeam);
    }

    this.publishSubscription(cache, loggedUser);
    return {
      total: 1,
      record: newCreatedTeam,
    };
  }

  /**
   * Method to get team detials.
   * @param DetailsUsersArgs params
   * @param Users loggedUser
   * @return Promise<ResponseEndpointInterface>
   */
  @Query(() => TeamResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('detials_team'))
  async getDetailsTeam(
    @Args('params') params: DetailsTeamsArgs,
    @CurrentLoggedUser() loggedUser: Users,
  ): Promise<ResponseEndpointInterface> {
    const { record } = await this.getTeamRecordByUuid(params.uuid, loggedUser);

    return {
      total: 1,
      record,
    };
  }

  /**
   * Method to update new team.
   * @params UpdateTeamArgs params
   * @param Users loggedUser
   * @return Promise<Users>
   */
  @Mutation(() => TeamResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('update_team'))
  public async updateTeam(
    @Args('params') params: UpdateTeamArgs,
    @CurrentLoggedUser() loggedUser: Users,
  ): Promise<ResponseEndpointInterface> {
    const { record, cache } = await this.getTeamRecordByUuid(
      params.uuid,
      loggedUser,
    );

    const updatedRecord = this.teamsService.updateTeam(record, params);
    const records = cache.map(team => {
      if (team.uuid === params.uuid) {
        team = {
          ...team,
          ...params,
        };
      }
      return team;
    });
    this.cacheManager.set(this.getCacheName(loggedUser), records, null);

    this.publishSubscription(records, loggedUser);

    return {
      total: 1,
      record: updatedRecord,
    };
  }

  /**
   * Method to delete team.
   * @param DeleteTeamArgs params
   * @param Users loggedUser
   * @return Promise<ResponseEndpointInterface>
   */
  @Mutation(() => TeamResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('delete_team'))
  async deleteTeam(
    @Args('params') params: DeleteTeamArgs,
    @CurrentLoggedUser() loggedUser: Users,
  ): Promise<ResponseEndpointInterface> {
    params.records.forEach(async (uuid: string) => {
      try {
        const { record, cache } = await this.getTeamRecordByUuid(
          uuid,
          loggedUser,
        );
    
        if (record.users.length > 0) {
          throw new CustomException(`hasAssigned`);
        }
    
        this.teamsService.deleteTeam(record.uuid);
        const records = cache.filter(team => team.uuid != uuid);
        this.cacheManager.set(this.getCacheName(loggedUser), records, null);
    
        this.publishSubscription(records, loggedUser);
      } catch(error) {
        // ...
      }
    });

    return {
      total: params.records.length,
    };
  }

  /**
   * Method to assign user to team.
   * @param Users loggedUser
   * @param AssingUserToTeamArgs params
   * @return Promise<ResponseEndpointInterface>
   */
  @Mutation(() => TeamResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('assign_user_to_team'))
  async assignUserToTeam(
    @CurrentLoggedUser() loggedUser: Users,
    @Args('params') params: AssingUserToTeamArgs,
  ): Promise<ResponseEndpointInterface> {
    const { record, cache } = await this.getTeamRecordByUuid(
      params.team,
      loggedUser,
    );

    const userToAssgin = await this.getOneRecordFromCache(
      params.user,
      loggedUser,
      async () =>
        await this.setRecordsToCache(
          loggedUser,
          this.usersService,
          {
            account: loggedUser.account.id,
            deleted_at: IsNull(),
          },
          'USERS_CACHE',
        ),
      'USERS_CACHE',
    );

    if (record.users.find(user => user.uuid === userToAssgin.record.uuid)) {
      throw new CustomException(
        `assigned`,
      );
    }

    this.teamsService.assignUserToTeam(record, userToAssgin.record);

    record.users.push(userToAssgin.record);
    const records = cache.map(team => {
      if (team.uuid === params.team) {
        team.user = record.users;
      }
      return team;
    });
    this.cacheManager.set(this.getCacheName(loggedUser), records, null);

    this.publishSubscription(records, loggedUser);

    return {
      total: 1,
      record,
    };
  }

  /**
   * Method to assign user to team.
   * @param Users loggedUser
   * @param AssingUserToTeamArgs params
   * @return Promise<ResponseEndpointInterface>
   */
  @Mutation(() => TeamResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('unassign_user_to_team'))
  async unAssignUserToTeam(
    @CurrentLoggedUser() loggedUser: Users,
    @Args('params') params: UnAssingUserToTeamArgs,
  ): Promise<ResponseEndpointInterface> {
    const { record, cache } = await this.getTeamRecordByUuid(
      params.team,
      loggedUser,
    );

    const userToUnAssgin = await this.getOneRecordFromCache(
      params.user,
      loggedUser,
      async () =>
        await this.setRecordsToCache(
          loggedUser,
          this.usersService,
          {
            account: loggedUser.account.id,
            deleted_at: IsNull(),
          },
          'USERS_CACHE',
        ),
      'USERS_CACHE',
    );

    if (!record.users.find(user => user.uuid === userToUnAssgin.record.uuid)) {
      throw new CustomException(
        `notAssigned`,
      );
    }

    this.teamsService.unAssignUserToTeam(record, userToUnAssgin.record);

    record.users = record.users.filter(
      user => user.uuid !== userToUnAssgin.record.uuid,
    );
    const records = cache.map(team => {
      if (team.uuid === params.team) {
        team.user = record.users;
      }
      return team;
    });
    this.cacheManager.set(this.getCacheName(loggedUser), records, null);

    this.publishSubscription(records, loggedUser);
    return {
      total: 1,
      record,
    };
  }

  /**
   * Method to publish subscription.
   * @param Array<Teams> records
   */
  private publishSubscription(records: Array<Teams>, loggedUser: Users): void {
    this.pubSub.publish(
      `channelhHandleTeamsSubscription_${loggedUser.account.id}`,
      {
        teamsList: {
          total: records.length,
          page: 1,
          records: this.getRecordsForPage(records, null),
        },
      },
    );
  }

  /**
   * Method to get one record team by uuid.
   * @param string uuid
   * @param Users loggedUser
   * @return Promise<{ record: Teams; cache }>
   */
  private async getTeamRecordByUuid(
    uuid: string,
    loggedUser: Users,
  ): Promise<{ record: Teams; cache }> {
    return await this.getOneRecordFromCache(
      uuid,
      loggedUser,
      async () =>
        await this.setRecordsToCache(loggedUser, this.teamsService, {
          account: loggedUser.account.id,
          deleted_at: IsNull(),
        }),
    );
  }
}
