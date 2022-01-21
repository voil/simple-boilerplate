import { ExceptionErrorHandler, ResponseExceptionHandler } from '../interfaces';

/**
 * AccessException
 * Access handler class to catch not authentication access.
 *
 * @implements ExceptionErrorHandler

 */
export class AccessException implements ExceptionErrorHandler {
  /**
   * @var ResponseExceptionHandler
   */
  private responseHandle: ResponseExceptionHandler = {
    code: 403,
    message: 'access',
    type: 'ACCESS_EXCEPTION',
  };

  /**
   * Constructor of class.
   * @param String ?message
   */
  public constructor(message?: string) {
    this.responseHandle.message = message || this.responseHandle.message;
  }
}
