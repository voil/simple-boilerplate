import { Cache } from 'cache-manager';
import { Query, Resolver, Args } from '@nestjs/graphql';
import { AuthGuard } from '../../core/guards/auth.guard';
import { BaseResolver } from '../../core/graphql/base.resolver';
import { UseGuards, CACHE_MANAGER, Inject } from '@nestjs/common';
import {
  OffsetTypeInterface,
  OrderByTypeInterface,
  ResponseEndpointInterface,
  FiltersCriteriaTypeInterface,
} from '../../../support/interfaces';
import { PrivilageCategorieArgs } from '../graphql/privilages.categories.args';
import { PrivilageCategorieResponseType } from './privilages.categories.types';
import { PrivilagesCategoriesService } from '../entities/privilages.categories.service';

/**
 * PrivilagesCategoriesResolver
 * Privilages categories resolver.
 *

 */
@Resolver()
export class PrivilagesCategoriesResolver extends BaseResolver {
  /**
   * @var String cacheName
   */
  protected cacheName: string = 'PRIVILAGES_CATEGORIES_CACHE';

  /**
   * Constructor of class.
   * @params Cache cacheManager
   * @params PrivilagesCategoriesService privilagesCategoriesService
   */
  constructor(
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
    private privilagesCategoriesService: PrivilagesCategoriesService,
  ) {
    super();
  }

  /**
   * Method to get privilages categories list.
   * @params PrivilagesCategoriesListArgs params
   * @return Promise<ResponseEndpointInterface>
   */
  @Query(() => PrivilageCategorieResponseType)
  @UseGuards(AuthGuard)
  async privilagesCategoriesList(
    @Args('params') params: PrivilageCategorieArgs,
  ): Promise<ResponseEndpointInterface> {
    const records = this.getRecordsOrderByField(
      this.getRecordsFilteredByFilterCriteria(
        await this.getRecordsFromCache(null, this.privilagesCategoriesService),
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
}
