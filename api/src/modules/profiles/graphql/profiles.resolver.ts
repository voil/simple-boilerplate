import { Cache } from 'cache-manager';
import { ProfileResponseType, ProfilesResponseType } from './profiles.types';
import { AclGuard } from '../../core/guards/acl.guard';
import { Profiles } from '../entities/profiles.entity';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ProfilesService } from '../entities/profiles.service';
import { BaseResolver } from '../../core/graphql/base.resolver';
import { UseGuards, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Users } from '../../authorization/entities/users.entity';
import { Query, Resolver, Mutation, Args, Subscription } from '@nestjs/graphql';
import { ProfilesTypeInterface } from '../../../support/interfaces';
import { CustomException } from '../../../support/handlers/custom.handler';
import {
  ProfilesListArgs,
  CreateProfileArgs,
  DeleteProfileArgs,
  UpdateProfileArgs,
  DetailsProfileArgs,
} from './profiles.args';
import {
  PubSubInterface,
  OffsetTypeInterface,
  OrderByTypeInterface,
  ResponseEndpointInterface,
  FiltersCriteriaTypeInterface,
} from '../../../support/interfaces';
import { UsersService } from '../entities/users.service';
import { CurrentLoggedUser } from '../../../support/decorators/logged.user.decorator';
import { cache } from 'ejs';

@Resolver()
export class ProfilesResolver extends BaseResolver {
  /**
   * @var String cacheName
   */
  public static cacheName = 'PROFILES_CACHE';

  /**
   * Constructor of class.
   * @param UsersService usersService
   * @param ProfilesService profilesService
   * @param Cache cacheManager
   * @param PubSubInterface pubSub
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
  @Subscription(() => ProfilesResponseType, {
    name: 'profilesList',
  })
  handleSubscription(
    empty,
    _,
    context,
  ): AsyncIterator<unknown, any, undefined> {
    return this.pubSub.asyncIterator(
      `channelhHandleProfilesSubscription_${context.connection.context.loggedUser.account.id}`,
    );
  }

  /**
   * Method to get profiles list.
   * @param Users loggedUser
   * @param ProfilesListArgs params
   * @return Promise<Array<Profiles>>
   */
  @Query(() => ProfilesResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('get_profiles_list'))
  public async profilesList(
    @CurrentLoggedUser() loggedUser: Users,
    @Args('params') params: ProfilesListArgs,
  ): Promise<ResponseEndpointInterface> {
    const records = this.getRecordsOrderByField(
      this.getRecordsFilteredByFilterCriteria(
        await this.getRecordsFromCache(loggedUser, this.profilesService, {
          account: loggedUser.account.id,
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
   * Method to create new profile.
   * @param CreateProfileArgs params
   * @param Users loggedUser
   * @return Promise<ResponseEndpointInterface>
   */
  @Mutation(() => ProfileResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('create_profile'))
  async createProfile(
    @Args('params') params: CreateProfileArgs,
    @CurrentLoggedUser() loggedUser: Users,
  ): Promise<ResponseEndpointInterface> {
    const newCreatedProfile = await this.profilesService.createProfile({
      ...params,
      account: loggedUser.account.id,
    } as ProfilesTypeInterface);

    const cache = await this.getRecordsFromCache(
      loggedUser,
      this.profilesService,
      {
        account: loggedUser.account.id,
      },
    );

    if (!cache.find(record => record.id === newCreatedProfile.id)) {
      newCreatedProfile.account = loggedUser.account;
      cache.unshift(newCreatedProfile);
    }

    this.publishSubscription(cache, loggedUser);

    return {
      total: 1,
      record: newCreatedProfile,
    };
  }

  /**
   * Method to delete profile.
   * @param DeleteProfileArgs params
   * @param Users loggedUser
   * @return Promise<ResponseEndpointInterface>
   */
  @Mutation(() => ProfileResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('delete_profile'))
  async deleteProfile(
    @Args('params') params: DeleteProfileArgs,
    @CurrentLoggedUser() loggedUser: Users,
  ): Promise<ResponseEndpointInterface> {
    params.records.forEach(async (uuid: string) => {
      try {
        const { record, cache } = await this.getProfileRecordByUuid(
          uuid,
          loggedUser,
        );
    
        const users = await this.usersService.getList({
          profile: record.id,
        });
    
        if (users.length > 0) {
          throw new CustomException(
            `assignedUser`,
          );
        }
    
        this.profilesService.deleteProfile(record.uuid);
    
        const records = cache.filter(profile => profile.uuid != uuid);
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
   * Method to get profile detials
   * @param DeleteProfileArgs params
   * @param Users loggedUser
   * @return Promise<ResponseEndpointInterface>
   */
  @Query(() => ProfileResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('detials_profile'))
  async getDetailsProfile(
    @Args('params') params: DetailsProfileArgs,
    @CurrentLoggedUser() loggedUser: Users,
  ): Promise<ResponseEndpointInterface> {
    const { record } = await this.getProfileRecordByUuid(
      params.uuid,
      loggedUser,
    );

    return {
      total: 1,
      record,
    };
  }

  /**
   * Method to update profile.
   * @param UpdateProfileArgs params
   * @return Promise<ResponseEndpointInterface>
   */
  @Mutation(() => ProfileResponseType)
  @UseGuards(new AuthGuard(), new AclGuard('update_profile'))
  async updateProfile(
    @Args('params') params: UpdateProfileArgs,
    @CurrentLoggedUser() loggedUser: Users,
  ): Promise<ResponseEndpointInterface> {
    const { record, cache } = await this.getProfileRecordByUuid(
      params.uuid,
      loggedUser,
    );

    const updatedRecord = this.profilesService.updateProfile(record, params);
    const records = cache.map(profile => {
      if (profile.uuid === params.uuid) {
        profile = {
          ...profile,
          ...updatedRecord,
        };
      }
      return profile;
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
   * @param Array<Profiles> records
   */
  private publishSubscription(
    records: Array<Profiles>,
    loggedUser: Users,
  ): void {
    this.pubSub.publish(
      `channelhHandleProfilesSubscription_${loggedUser.account.id}`,
      {
        profilesList: {
          total: records.length,
          page: 1,
          records,
        },
      },
    );
  }

  /**
   * Method to get one record profile by uuid.
   * @param string uuid
   * @param Users loggedUser
   * @return Promise<{ record: Users; cache }>
   */
  private async getProfileRecordByUuid(
    uuid: string,
    loggedUser: Users,
  ): Promise<{ record: Profiles; cache }> {
    return await this.getOneRecordFromCache(
      uuid,
      loggedUser,
      async () =>
        await this.setRecordsToCache(loggedUser, this.profilesService, {
          account: loggedUser.account.id,
        }),
    );
  }
}
