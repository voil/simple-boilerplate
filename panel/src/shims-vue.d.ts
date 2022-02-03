/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// declare module 'graphql' {
//   interface GraphQLError {};
//   export {
//     GraphQLError,
//   };
// }
// declare module 'graphql-*'
// declare module 'apollo-*';
// declare module '@apollo/client' {
//   interface Operation {};
//   interface FetchResult<T, U, K>{};
//   interface FetchPolicy{};
//   interface ApolloQueryResult<T>{};
//   interface NormalizedCacheObject{};


//   export {
//     Operation,
//     FetchResult,
//     FetchPolicy,
//     ApolloQueryResult,
//     NormalizedCacheObject,
//   };
// }
