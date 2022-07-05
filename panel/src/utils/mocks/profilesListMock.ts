import { ParamsGraphQLInterface, MockInterface } from '@/utils/interfaces';

/**
 * @var {MockUserParamsType}
 */
type MockProfileListParamsType = {

}

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
  public handle(params: ParamsGraphQLInterface): any {
    console.log('sdf');
    return [];
  }
}

export default new ProfileListMock();
