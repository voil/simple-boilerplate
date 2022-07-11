import { Query } from '@/services/cqrs/query';

export default class GetProjectsList extends Query {
  /**
   * @var {String}
   */
  protected query = `
    query ProjectsList($params: ProjectsListArgs!) {
      projectsList(params: $params) {
        total
        records {
          uuid
          name
          description
          is_global
          is_active
          created_at
          updated_at
          team {
            uuid
          }
        }
      }
    }
  `;
}
