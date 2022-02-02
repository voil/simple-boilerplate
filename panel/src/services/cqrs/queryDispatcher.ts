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
      return (await ApolloService.query(action.getQuery())).data;
    } catch (e) {
      return null;
    }
  }
}

export default new QueryDispatcher();
