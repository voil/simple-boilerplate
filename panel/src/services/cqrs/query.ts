/**
 * Interface for class Query.
 *
 * @export
 * @interface QueryInterface
 */
export type QueryInterface = {
  getQuery(): string;
}

/**
 * Abstract class for query commands.
 *
 * @abstract
 * @class Query
 * @implements {QueryInterface}
 */
export abstract class Query implements QueryInterface {
  /**
   * @var {String}
   */
  protected query: string;

  /**
   * COnstructor of class.
   */
  constructor() {
    this.query = '';
  }

  /**
   * MEthod to get query.
   * @returns {String}
   */
  public getQuery(): string {
    return this.query;
  }
}
