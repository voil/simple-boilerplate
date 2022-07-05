import { ParamsGraphQLInterface, MockInterface } from '@/utils/interfaces';
import dataMock from '@/utils/mocks/data/profilesData';

/**
 * ProfileListMock
 * Profile list mock endpoints.
 *
 * @implements MockInterface
 */
class ProfileListMock implements MockInterface {
  /**
   * Method to handle mock login user.
   * @param {ParamsGraphQLInterface} params
   * @returns {Any}
   */
  public async handle(params: ParamsGraphQLInterface): Promise<any> {
    let data = dataMock.value;
    const total = data.length;

    if (params.params.order) {
      const { orderBy } = await import('lodash');
      data = orderBy(data, [params.params.order.field], [params.params.order.type.toLowerCase()]);
    }

    const limit = parseInt(params.params.offset.limit.replace('L', ''), 10);
    const currentPage = (params.params.offset.page - 1) * limit;
    data = data.slice(currentPage, limit * params.params.offset.page);

    return {
      data: {
        profilesList: {
          total: total,
          records: data,
        },
      }
    };
  }
}

export default new ProfileListMock();
