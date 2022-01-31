import { Query } from '@/services/cqrs/query';

export default class GetLoggedUserQuery extends Query {
  /**
   * @var {String}
   */
  protected query = `
    query GetLoggedUser {
      getLoggedUser {
        record {
          uuid
          name_and_surname
          profile {
            uuid
            name
            privilages
          }
          teams {
            uuid
            name
          }
        }
      }
    }
  `;
}
