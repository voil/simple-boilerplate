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
  public async execute<T>(
    action: QueryInterface,
    subscription: ((data: any) => void) | null = null,
  ): Promise<T|null> {
    try {
      const ApolloService = (await import('@/services/apolloService')).default;
      const { hFirstToLower } = await import('@/utils/helpers');

      if (subscription) {
        ApolloService.subscription(action.getQuery(), action.getParams(), (data) => {
          const response = data.data;

          let match = action.getQuery().match(/query (.*)\(/);
          match = match && match.length > 0 ? match : action.getQuery().match(/query (.*)\{/);

          subscription(match ? response[hFirstToLower(match[1]).trim()] : null);
        });
        return null;
      }

      const response = (await ApolloService.query(action.getQuery(), action.getParams())).data;
      let match = action.getQuery().match(/query (.*)\(/);
      match = match && match.length > 0 ? match : action.getQuery().match(/query (.*)\{/);

      return match ? response[hFirstToLower(match[1]).trim()] : null;
    } catch (e) {
      return null;
    }
  }
}

export default new QueryDispatcher();
