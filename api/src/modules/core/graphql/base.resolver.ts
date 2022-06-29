import { orderBy } from 'lodash';
import { Cache } from 'cache-manager';
import { ObjectLiteral } from 'typeorm';
import { BaseService } from '../entities/base.service';
import {
  OffsetTypeInterface,
  OrderByTypeInterface,
  FiltersCriteriaTypeInterface,
} from '../../../support/interfaces';
import { Users } from '../../authorization/entities/users.entity';
import { hSetFilterToArrayRecords } from '../../../support/helpers';
import { CustomException } from '../../../support/handlers/custom.handler';

export abstract class BaseResolver {
  /**
   * @var String|Null cacheName
   */
  protected cacheName: string | null = null;

  /**
   * @var Cache cacheManager
   */
  protected cacheManager: Cache;

  /**
   * Method to get limited records by page.
   * @param Array<any> records
   * @param OffsetTypeInterface offsetPageParams
   * @return Array<any>
   */
  protected getRecordsForPage(
    records: Array<any>,
    offsetPageParams: OffsetTypeInterface,
  ): Array<any> {
    const limit = offsetPageParams?.limit || 10;
    if (offsetPageParams?.page) {
      const currentPage = (offsetPageParams.page - 1) * limit;
      return records.slice(currentPage, limit * offsetPageParams.page);
    }
    return records;
  }

  /**
   * Method to get records order records.
   * @param Array<any> loggedUser
   * @param OrderByTypeInterface orderByParams
   * @return Array<any>
   */
  protected getRecordsOrderByField(
    records: Array<any>,
    orderByParams: OrderByTypeInterface,
  ): Array<any> {
    return orderByParams?.field
      ? orderBy(records, [orderByParams.field], [orderByParams?.type || 'desc'])
      : records;
  }

  /**
   * Method to get records from cache.
   * @param Array<any> records
   * @param Array<FiltersCriteriaTypeInterface> filtersCriteriaParams
   * @return Array<any>
   */
  protected getRecordsFilteredByFilterCriteria(
    records: Array<any>,
    filtersCriteriaParams: Array<FiltersCriteriaTypeInterface>,
  ): Array<any> {
    if(!filtersCriteriaParams) {
      return records;
    }
    let copyRecords = records;
    filtersCriteriaParams.forEach(filter => {
      copyRecords = hSetFilterToArrayRecords(copyRecords, filter);
    });

    return copyRecords;
  }

  /**
   * Method to get records from cache.
   * @param Users loggedUser
   * @param BaseService service
   * @return Promise<Array<any>>
   */
  protected async getRecordsFromCache(
    loggedUser: Users,
    service: BaseService,
    where: ObjectLiteral = {},
  ): Promise<Array<any>> {
    //await this.cacheManager.reset();
    const cache = await this.cacheManager.get(this.getCacheName(loggedUser));
    if (!cache) {
      await this.setRecordsToCache(loggedUser, service, where);
    }
    return await this.cacheManager.get(this.getCacheName(loggedUser));
  }

  /**
   * Method to get one records from cache.
   * @param String uuid
   * @params Users loggedUser
   * @param Function callback
   * @return Promise<any>
   */
  protected async getOneRecordFromCache(
    uuid: string,
    loggedUser: Users,
    callback: () => void,
    cacheName?: string | null,
  ): Promise<any> {
    let cache = await this.cacheManager.get(
      this.getCacheName(loggedUser, cacheName),
    );
    if (!cache) {
      await callback();
      cache = await this.cacheManager.get(
        this.getCacheName(loggedUser, cacheName),
      );
    }

    const record = cache.find(record => record.uuid === uuid);
    if (!record) {
      throw new CustomException(`notExists`);
    }

    return { record, cache };
  }

  /**
   * Method to get cache name.
   * @params Users loggedUser
   * @return String
   */
  protected getCacheName(loggedUser: Users | null, cacheName: string | null = null): string {
    return `${cacheName || this.cacheName}${
      loggedUser ? '_' + loggedUser.account.id : ''
    }`;
  }

  /**
   * Method to set list to cache.
   * @params Users loggedUser
   * @params BaseService service
   * @params ObjectLiteral where
   * @return Promise<void>
   */
  protected async setRecordsToCache(
    loggedUser: Users | null = null,
    service: BaseService,
    where: ObjectLiteral = {},
    cacheName?: string | null,
  ): Promise<void> {
    await this.cacheManager.set(
      this.getCacheName(loggedUser, cacheName),
      await service.getList(where),
      null,
    );
  }

  /**
   * Method to set list to cache static.
   * @params Users loggedUser
   * @params Array<T>
   * @return Promise<void>
   */
  protected async setRecordsToCacheStatic(
    loggedUser: Users | null = null,
    list: Array<any>,
    cacheName?: string | null,
  ): Promise<void> {
    await this.cacheManager.set(
      this.getCacheName(loggedUser, cacheName),
      list,
      null,
    );
  }
}
