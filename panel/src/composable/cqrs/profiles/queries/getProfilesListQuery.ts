import { Query } from '@/services/cqrs/query';

export default class GetProfilesList extends Query {
  /**
   * @var {String}
   */
  protected query = `
    query ProfilesList($params: ProfilesListArgs!) {
      profilesList(params: $params) {
        total
        records {
          uuid
          name
          label
          is_active
          description
          can_delete   
          created_at
          updated_at
        }
      }
    }
  `;
}
