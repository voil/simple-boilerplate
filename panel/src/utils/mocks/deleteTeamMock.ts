import { ParamsGraphQLInterface, MockInterface } from '@/utils/interfaces';
import dataMock, { TeamType } from '@/utils/mocks/data/teamsData';

/**
 * DeleteTeamsMock
 * Team delete mock endpoints.
 *
 * @implements MockInterface
 */
class DeleteTeamsMock implements MockInterface {
  /**
   * Method to handle mock login user.
   * @param {ParamsGraphQLInterface} params
   * @returns {Any}
   */
  public async handle(params: ParamsGraphQLInterface): Promise<any> {
    dataMock.value = dataMock.value.filter((record: TeamType) => !params.params
      .records.includes(record.uuid));
    return {
      data: {
        deleteTeam: {
          data: {
            total: params.params.records.length,
            record: params.params.records,
          },
        },
      },
    };
  }
}

export default new DeleteTeamsMock();
