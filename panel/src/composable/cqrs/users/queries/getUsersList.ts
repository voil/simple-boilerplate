import { Query } from '@/services/cqrs/query';

export default class GetUsersList extends Query {
  /**
   * @var {String}
   */
  protected query = `
    query UsersList($params: UsersListArgs!) {
      usersList(params: $params) {
        total
        records {
          uuid
          name_and_surname
          email
          is_active
          created_at
          updated_at
          profile {
            uuid
          }
          teams {
            uuid
          }        
        }
      }
    }
  `;
}
