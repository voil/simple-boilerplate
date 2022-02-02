import { GraphQLError } from 'graphql';

export interface ParamsGraphQLInterface {
  [propName: string]: any;
}

export interface ErrorResponseInterface extends GraphQLError{
  type: string;
  code: number;
  message: string;
}

export interface MockInterface {
  handle(params?: ParamsGraphQLInterface): any;
}
