import { ParamsGraphQLInterface, MockInterface } from '@/utils/interfaces';

/**
 * @var {MockUserParamsType}
 */
type MockUserParamsType = {
  email: string;
  password: string;
}

/**
 * LoginToPlatformMock
 * Login mock endpoints.
 *
 * @implements MockInterface
 */
class LoginToPlatformMock implements MockInterface {
  /**
   * @var {MockUserParamsType}
   */
  private mockParams: MockUserParamsType = {
    email: 'test@app.com',
    password: 'exampletest1A',
  }

  /**
   * Method to handle mock login user.
   * @param {ParamsGraphQLInterface} params
   * @returns {Any}
   */
  public handle(params: ParamsGraphQLInterface): any {
    return (params.email === this.mockParams.email)
      && (params.password === this.mockParams.password)
      ? {
        data: {},
      }
      : {
        data: null,
      };
  }
}

export default new LoginToPlatformMock();
