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

  protected params: any;

  /**
   * COnstructor of class.
   */
  constructor(params?: any) {
    this.query = '';
    this.params = params || {};
  }

  /**
   * MEthod to get query.
   * @returns {String}
   */
  public getQuery(): string {
    return this.query;
  }

  public getParams(): any {
    return this.params;
  }
}
