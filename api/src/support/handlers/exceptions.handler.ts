import { ResponseExceptionHandler } from '../interfaces';
import { CustomException } from './custom.handler';

/**
 * ExceptionsHandler
 * Exception handler class to catch all errors.
 *

 */
export class ExceptionsHandler {
  /**
   * @var ResponseExceptionHandler
   */
  private responseHandle: ResponseExceptionHandler = {
    code: 500,
    message: 'internal server error',
    type: 'INTERNAL_SERVER_ERROR',
  };

  /**
   * Constructor of class.
   * @param String error
   */
  public constructor(error: string) {
    this.responseHandle = this.parseErrorResponse(error);
  }

  /**
   * Method to handle response error exception.
   * @return ResponseExceptionHandler
   */
  public handle(): ResponseExceptionHandler {
    return this.responseHandle;
  }

  /**
   * Method to parse error string.
   * @return ResponseExceptionHandler
   */
  private parseErrorResponse(error: string): ResponseExceptionHandler {
    error = error
      .replace('Unexpected error value: ', '')
      .replace('responseHandle', '"responseHandle"')
      .replace('code', '"code"')
      .replace('message', '"message"')
      .replace('type', '"type"');
    try {
      return JSON.parse(error).responseHandle as ResponseExceptionHandler;
    } catch (handleError) {
      return new CustomException(error).handle();
    }
  }
}
