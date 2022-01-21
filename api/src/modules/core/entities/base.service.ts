import { ObjectLiteral } from 'typeorm';

/**
 * BaseService
 * Base service.
 *

 */
export abstract class BaseService {
  public abstract getList(where: ObjectLiteral);
}