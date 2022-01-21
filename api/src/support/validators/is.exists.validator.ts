import {
  ValidationOptions,
  ValidatorConstraint,
  registerDecorator,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { Connection } from 'typeorm';
import { Cache } from 'cache-manager';
import { Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { CustomException } from '../handlers/custom.handler';
import { IsExistsValidatorParamsInterface } from '../interfaces';
import { ConfigService } from '../../modules/core/services/config.service';

/**
 * CheckIsExists
 * Check is record exists.
 *
 * @implements ValidatorConstraintInterface

 */
@ValidatorConstraint({ async: true })
@Injectable()
export class CheckIsExists implements ValidatorConstraintInterface {
  /**
   * Constructor of class.
   * @params Connection connection
   * @params Cache cacheManager
   */
  constructor(
    private connection: Connection,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  /**
   * Method to validate is record exists.
   * @params String value
   * @params ValidationArguments args
   */
  async validate(value: string, args: ValidationArguments) {
    const params = args.constraints[0];
    const result = await this[
      params.cache ? 'checkInCache' : 'checkInDatabase'
    ](params, value);

    if (params.condition) {
      if (result.length > 0) {
        throw new CustomException(
          `The ${params.column} = '${value}' exist in database`,
        );
      }
    } else {
      if (result.length === 0) {
        throw new CustomException(
          `The ${params.column} = '${value}' not exist in database`,
        );
      }
    }
    return true;
  }

  /**
   * Method to check is record exists in cache.
   * @params params IsExistsValidatorParamsInterface
   * @params String string
   * @return Promise<Array<any>>
   */
  private async checkInCache(
    params: IsExistsValidatorParamsInterface,
    value: string,
  ): Promise<Array<any>> {
    const listFromCache = await this.cacheManager.get(params.cache);
    return listFromCache.find(record => record[params.column] === value);
  }

  /**
   * Method to check is record exists in database.
   * @params params IsExistsValidatorParamsInterface
   * @params String string
   * @return Promise<Array<any>>
   */
  private async checkInDatabase(
    params: IsExistsValidatorParamsInterface,
    value: string,
  ): Promise<Array<any>> {
    const sql = `
      SELECT
        *
      FROM ${this.configService.get('DATABASE_IVR_SCHEMA')}.${params.table}
      WHERE ${params.column} = '${value}' AND
      deleted_at IS NULL
      LIMIT 1
    `;

    return await this.connection.query(sql);
  }
}

/**
 * Method to register dynamic decorator for check is record exists.
 * @params IsExistsValidatorParamsInterface params
 * @params ValidationOptions? validationOptions
 * @return Function
 */
export function IsExists(
  params: IsExistsValidatorParamsInterface,
  validationOptions?: ValidationOptions,
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [params],
      validator: CheckIsExists,
    });
  };
}
