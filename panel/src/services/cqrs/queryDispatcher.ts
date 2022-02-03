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
      const { hFirstToLower } = await import('@/utils/helpers');

      const response = (await ApolloService.query(action.getQuery())).data;
      let match = action.getQuery().match(/query (.*)\(/);
      match = match && match.length > 0 ? match : action.getQuery().match(/query (.*)\{/);

      return match ? response[hFirstToLower(match[1]).trim()] : null;
    } catch (e) {
      return null;
    }
  }
}

export default new QueryDispatcher();
