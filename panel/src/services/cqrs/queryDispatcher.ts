import { QueryInterface } from '@/services/cqrs/query';

/**
 * Main class of QueryDispatcher.
 * @class QueryDispatcher
 */
class QueryDispatcher {
  /**
   * Execute query sql.
   *
   * @static
   * @param {QueryInterface} action
   * @return {@returns }
   */
  public async execute(action: QueryInterface): Promise<void|null> {
    try {
      const ApolloService = (await import('@/services/apolloService')).default;
      const response = await ApolloService.query(action.getQuery());
      console.log(response);
      return null;
    } catch (e) {
      return null;
    }
  }
}

export default new QueryDispatcher();
