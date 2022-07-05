import { Query } from '@/services/cqrs/query';

export default class GetTeamsList extends Query {
  /**
   * @var {String}
   */
  protected query = `
    query TeamsList($params: TeamsListArgs!) {
      teamsList(params: $params) {
        total
        records {
          uuid
          name
          users {
            uuid
          }
          is_active
          description 
          created_at
          updated_at
        }
      }
    }
  `;
}
