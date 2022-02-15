import { IsNull } from 'typeorm';
import { Cache } from 'cache-manager';
import { UserResponseType, UsersResponseType } from './users.types';
import { Users } from '../entities/users.entity';
import { AclGuard } from '../../core/guards/acl.guard';
import { AuthGuard } from '../../core/guards/auth.guard';
import { UsersService } from '../entities/users.service';
import { ProfilesService } from '../entities/profiles.service';
import { BaseResolver } from '../../core/graphql/base.resolver';
import {
  PubSubInterface,
  UsersTypeInterface,
  OffsetTypeInterface,
  OrderByTypeInterface,
  ResponseEndpointInterface,
  FiltersCriteriaTypeInterface,
} from '../../../support/interfaces';
import { Mutation, Resolver, Query, Args, Subscription } from '@nestjs/graphql';
import { UseGuards, CACHE_MANAGER, Inject } from '@nestjs/common';
import { CustomException } from '../../../support/handlers/custom.handler';
import { ProfilesResolver } from '../../profiles/graphql/profiles.resolver';
import { CurrentLoggedUser } from '../../../support/decorators/logged.user.decorator';
import {
  UsersListArgs,
  CreateUserArgs,
  DetailsUsersArgs,
  DeleteUserArgs,
  UpdateUserArgs,
} from './users.args';

/**
 * UsersResolver
 * Users resolver.
 *

 */
@Resolver()
export class UsersResolver extends BaseResolver {
  /**
   * @var String cacheName
   */
  protected cacheName = 'USERS_CACHE';

  /**
   * Constructor of class.
   * @param UsersService usersService
   * @param ProfilesService profilesService
   * @param Cache cacheManager
   */
  constructor(
    private usersService: UsersService,
    private profilesService: ProfilesService,
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
    @Inject('PUB_SUB') private pubSub: PubSubInterface,
  ) {
    super();
  }

  /**
   * Method to handle subscription.
   * @return AsyncIterator<unknown, any, undefined>
   */
  @Subscription(() => UsersResponseType, {
    name: 'usersList',
  })
  handleSubscription(
    empty,
    _,
    context,
  ): AsyncIterator<unknown, any, undefined> {
    return this.pubSub.asyncIterator(
      `channelhHandleUsersSubscription_${context.connection.context.loggedUser}`,
    );
  }

  /**
   * Method to get users list.
   * @param Users loggedUser
   * @param UsersListArgs params
   * @return Promise<Array<Profiles>>
   */
  @Query(() => UsersResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('get_users_list'))
  public async usersList(
    @CurrentLoggedUser() loggedUser: Users,
    @Args('params') params: UsersListArgs,
  ): Promise<ResponseEndpointInterface> {
    const records = this.getRecordsOrderByField(
      this.getRecordsFilteredByFilterCriteria(
        await this.getRecordsFromCache(loggedUser, this.usersService, {
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
      ).map((record) => {
        return {
          ...record,
          canDelete: record.teams.length === 0 && record.uuid !== loggedUser.uuid
        };
      }),
    };
  }

  /**
   * Method to create new user.
   * @params CreateUserArgs params
   * @param Users loggedUser
   * @return Promise<Users>
   */
  @Mutation(() => UserResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('create_user'))
  public async createUser(
    @Args('params') params: CreateUserArgs,
    @CurrentLoggedUser() loggedUser: Users,
  ): Promise<ResponseEndpointInterface> {
    const { record } = await this.getOneRecordFromCache(
      params.profile,
      loggedUser,
      async () =>
        await this.setRecordsToCache(
          loggedUser,
          this.profilesService,
          {
            account: loggedUser.account.id,
          },
          'PROFILES_CACHE',
        ),
      'PROFILES_CACHE',
    );

    params.profile = record.id;
    const newCreatedUser = await this.usersService.createUser({
      ...params,
      account: loggedUser.account.id,
    } as UsersTypeInterface);

    const cache = await this.getRecordsFromCache(
      loggedUser,
      this.usersService,
      {
        account: loggedUser.account.id,
        deleted_at: IsNull(),
      },
    );

    newCreatedUser.profile = record;
    if (!cache.find(record => record.id === newCreatedUser.id)) {
      cache.unshift(newCreatedUser);
    }

    this.publishSubscription(cache, loggedUser);

    return {
      total: 1,
      record: newCreatedUser,
    };
  }

  /**
   * Method to get user detials
   * @param DetailsUsersArgs params
   * @param Users loggedUser
   * @return Promise<Users>
   */
  @Query(() => UserResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('detials_user'))
  async getDetailsUser(
    @Args('params') params: DetailsUsersArgs,
    @CurrentLoggedUser() loggedUser: Users,
  ): Promise<ResponseEndpointInterface> {
    const { record } = await this.getUserRecordByUuid(params.uuid, loggedUser);
    return {
      total: 1,
      record,
    };
  }

  /**
   * Method to delete user.
   * @param DeleteUserArgs params
   * @param Users loggedUser
   * @return Promise<Profiles>
   */
  @Mutation(() => UserResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('delete_user'))
  async deleteUser(
    @Args('params') params: DeleteUserArgs,
    @CurrentLoggedUser() loggedUser: Users,
  ): Promise<ResponseEndpointInterface> {

    params.records.forEach(async (uuid: string) => {
      try {
        const { record, cache } = await this.getUserRecordByUuid(
          uuid,
          loggedUser,
        );
      
        if (record.uuid === loggedUser.uuid) {
          throw new CustomException(`cannotDelete`);
        }
        if (record.teams.length > 0) {
          throw new CustomException(
            `assignedToTeam`,
          );
        }

        this.usersService.deleteUser(record.uuid);
        const records = cache.filter(user => user.uuid != uuid);

        this.setRecordsToCacheStatic(
          loggedUser,
          records,
        );

        this.publishSubscription(records, loggedUser);
      } catch (error) {
        // ...
      }
    });

    return {
      total: params.records.length,
    };
  }

  /**
   * Method to update user.
   * @param UpdateUserArgs params
   * @param Users loggedUser
   * @return Promise<Profiles>
   */
  @Mutation(() => UserResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('update_user'))
  async updateUser(
    @Args('params') params: UpdateUserArgs,
    @CurrentLoggedUser() loggedUser: Users,
  ): Promise<ResponseEndpointInterface> {
    const userParams = await this.getUserRecordByUuid(params.uuid, loggedUser);
    const profileParams = await this.getOneRecordFromCache(
      params.profile,
      loggedUser,
      async () =>
        await this.setRecordsToCache(
          loggedUser,
          this.profilesService,
          {
            account: loggedUser.account.id,
          },
          ProfilesResolver.cacheName,
        ),
      ProfilesResolver.cacheName,
    );

    params.profile = profileParams.record;
    const updatedRecord = this.usersService.updateUser(userParams.record, {
      ...Object.assign(
        params,
        userParams.record.id === loggedUser.id
          ? {}
          : {
              profile: profileParams.record.id,
            },
      ),
    });

    const cache = await this.getRecordsFromCache(
      loggedUser,
      this.usersService,
      {
        account: loggedUser.account.id,
        deleted_at: IsNull(),
      },
    );

    const records = cache.map(user => {
      if (user.uuid === params.uuid) {
        user = {
          ...user,
          ...params,
        };
      }
      return user;
    });
    this.cacheManager.set(this.getCacheName(loggedUser), records, null);

    this.publishSubscription(records, loggedUser);

    return {
      total: 1,
      record: updatedRecord,
    };
  }

  /**
   * Method to publish subscription.
   * @param Array<Users> records
   */
  private publishSubscription(records: Array<Users>, loggedUser: Users): void {
    this.pubSub.publish(
      `channelhHandleUsersSubscription_${loggedUser.account.id}`,
      {
        usersList: {
          total: records.length,
          page: 1,
          records: this.getRecordsForPage(records, null),
        },
      },
    );
  }

  /**
   * Method to get one record user by uuid.
   * @param string uuid
   * @param Users loggedUser
   * @return Promise<{ record: Users; cache }>
   */
  private async getUserRecordByUuid(
    uuid: string,
    loggedUser: Users,
  ): Promise<{ record: Users; cache }> {
    return await this.getOneRecordFromCache(
      uuid,
      loggedUser,
      async () =>
        await this.setRecordsToCache(loggedUser, this.usersService, {
          account: loggedUser.account.id,
          deleted_at: IsNull(),
        }),
    );
  }
}
