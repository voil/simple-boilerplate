import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloLink, split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ErrorHandlerService from '@/services/errorHandlerService';
import { ParamsGraphQLInterface, ErrorResponseInterface } from '@/utils/interfaces';
import {
  Operation,
  FetchResult,
  FetchPolicy,
  ApolloQueryResult,
  NormalizedCacheObject,
} from '@apollo/client';

export interface ApolloServiceInterface {
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
 * ApolloService
 * Apollo service for graphql.
 *
 * @implements ApolloServiceInterface
 */
class ApolloService implements ApolloServiceInterface {
  /**
   * @var String ApolloClient<NormalizedCacheObject>
   */
  private clientApollo: ApolloClient<NormalizedCacheObject>;

  /**
   * Constructor of class.
   */
  public constructor() {
    this.clientApollo = this.createApolloClient();
  }

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
    const response = await this.clientApollo.query({
      query: gql`
        ${query}
      `,
      variables: params,
      ...isCacheDisactive ? {
        fetchPolicy: 'network-only' as FetchPolicy,
      } : {},
    });
    return response;
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
    const response = await this.clientApollo.mutate({
      mutation: gql`
        ${mutation}
      `,
      variables: params,
      fetchPolicy: 'no-cache' as FetchPolicy,
    });
    return response;
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
    await this.clientApollo.subscribe({
      query: gql`
        ${subscription}
      `,
      variables: params,
      fetchPolicy: 'network-only' as FetchPolicy,
    }).subscribe({
      next(response: any) {
        if (callback) {
          callback(response);
        }
      },
    });
  }

  /**
   * Method to create apollo client.
   *
   * @return ApolloClient<NormalizedCacheObject>
   */
  private createApolloClient(): ApolloClient<NormalizedCacheObject> {
    return new ApolloClient({
      link: this.createSplitLinktForSubscriptions(
        this.createMiddlewareCatchErrorResponse()
          .concat(this.createMiddlewareCatchResponse()
            .concat(this.createHttpLink())),
        this.createWebsocketApolloLink(),
      ),
      cache: new InMemoryCache({
        addTypename: false,
      }),
    });
  }

  /**
   * Method to create websocket link for apollo client.
   *
   * @return WebSocketLink
   */
  private createWebsocketApolloLink(): WebSocketLink {
    return new WebSocketLink({
      uri: 'ws://localhost:3000/graphql',
      options: {
        reconnect: true,
        lazy: true,
        reconnectionAttempts: 1,
      },
    });
  }

  /**
   * Method to split links apollo server for websocket and http protocol.
   *
   * @param ApolloLink httpLink
   * @param WebSocketLink websocketLink
   * @return ApolloLink
   */
  private createSplitLinktForSubscriptions(
    httpLink: ApolloLink,
    websocketLink: WebSocketLink,
  ): ApolloLink {
    return split(
      ({ query }: Operation) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition'
          && definition.operation === 'subscription'
        );
      },
      websocketLink,
      httpLink,
    );
  }

  /**
   * Method to catch errors.
   *
   * @return ApolloLink
   */
  private createMiddlewareCatchResponse(): ApolloLink {
    return new ApolloLink((operation, forward) => forward(operation).map((response: any) => {
      if (!response.data) {
        ErrorHandlerService.parseError(response.errors as readonly ErrorResponseInterface[]);
      }
      return response;
    }));
  }

  /**
   * Method to catch graphql errors.
   *
   * @return ApolloLink
   */
  private createMiddlewareCatchErrorResponse(): ApolloLink {
    return onError(({ graphQLErrors }) => {
      if (graphQLErrors) {
        // ...
      }
    });
  }

  /**
   * Method to create http link.
   *
   * @return HttpLink
   */
  private createHttpLink(): HttpLink {
    return new HttpLink({
      uri: 'http://localhost:3000/graphql',
      credentials: 'include',
      fetch,
    });
  }
}

export default new ApolloService();
