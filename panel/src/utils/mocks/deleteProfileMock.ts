import { ParamsGraphQLInterface, MockInterface } from '@/utils/interfaces';
import dataMock, { ProfileType } from '@/utils/mocks/data/profilesData';

/**
 * DeleteProfileMock
 * Profile delete mock endpoints.
 *
 * @implements MockInterface
 */
class DeleteProfileMock implements MockInterface {
  /**
   * Method to handle mock login user.
   * @param {ParamsGraphQLInterface} params
   * @returns {Any}
   */
  public async handle(params: ParamsGraphQLInterface): Promise<any> {
    dataMock.value = dataMock.value.filter((record: ProfileType) => !params.params
      .records.includes(record.uuid));
    return {
      data: {
        deleteProfile: {
          data: {
            total: params.params.records.length,
            record: params.params.records,
          },
        },
      },
    };
  }
}

export default new DeleteProfileMock();
