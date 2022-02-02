import { ParamsGraphQLInterface, MockInterface } from '@/utils/interfaces';
import {
  FetchResult,
  ApolloQueryResult,
} from '@apollo/client';

/**
 * @var {ApolloServiceInterface}
 */
interface ApolloServiceInterface {
  query(
    query: string,
    params?: ParamsGraphQLInterface,
    isCacheDisactive?: boolean,
  ): Promise<ApolloQueryResult<any>>;
  mutation(
    mutation: string,
    params?: ParamsGraphQLInterface
  ): Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  subscription(
    subscription: string,
    params?: ParamsGraphQLInterface,
    callback?: (data: any) => void
  ): Promise<void>;
}

/**
 * ApolloServiceMock
 * Apollo mock service for mock graphql.
 *
 * @implements ApolloServiceInterface
 */
export default class ApolloServiceMock implements ApolloServiceInterface {
  /**
   * Method to handle query apollo.
   *
   * @param String query
   * @param ParamsGraphQLInterface params
   * @return  Promise<ApolloQueryResult<any>>
   */
  public async query(
    query: string,
    params?: ParamsGraphQLInterface,
    isCacheDisactive?: boolean,
  ): Promise<ApolloQueryResult<any>> {
    return {} as Promise<ApolloQueryResult<any>>;
  }

  /**
   * Method to handle mutation apollo.
   *
   * @param String mutation
   * @param ParamsGraphQLInterface params
   * @return Promise<FetchResult<any, Record<string, any>, Record<string, any>>>
   */
  public async mutation(
    mutation: string,
    params?: ParamsGraphQLInterface,
  ): Promise<FetchResult<any, Record<string, any>, Record<string, any>>> {
    const mock = await this.getMockClass(mutation, 'mutation');
    if (mock) {
      const response = mock.handle(params);
      if (!response.data) {
        throw new Error(JSON.stringify(response.errors));
      }
      return response;
    }

    return {};
  }

  /**
   * Method to handle subscription apollo.
   *
   * @param String subscription
   * @param ParamsGraphQLInterface params
   * @param (data: any) => void callback
   * @return Promise<void>
   */
  public async subscription(
    subscription: string,
    params?: ParamsGraphQLInterface,
    callback?: (data: any) => void,
  ): Promise<void> {
    // ...
  }

  private async getMockClass(gql: string, action: string): Promise<MockInterface | null> {
    const { hFirstToLower } = await import('@/utils/helpers');
    const regex: RegExp = action === 'mutation' ? /mutation (.*)\(/ : /query (.*)\(/;
    const match = gql.match(regex);

    if (match) {
      const mock = (await import(`@/utils/mocks/${hFirstToLower(match[1])}Mock`)).default;
      return mock;
    }

    return null;
  }
}
