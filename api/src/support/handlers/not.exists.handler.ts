import { ExceptionErrorHandler, ResponseExceptionHandler } from '../interfaces';

/**
 * NotExistException
 *
 * @implements ExceptionErrorHandler

 */
export class NotExistException implements ExceptionErrorHandler {
  /**
   * @var ResponseExceptionHandler
   */
  private responseHandle: ResponseExceptionHandler = {
    code: 406,
    message: 'not acceptable',
    type: 'NOT_ACCEPTABLE_EXCEPTION',
  };

  /**
   * Constructor of class.
   * @param String ?message
   */
  public constructor(message?: string) {
    this.responseHandle.message = message || this.responseHandle.message;
  }
}
