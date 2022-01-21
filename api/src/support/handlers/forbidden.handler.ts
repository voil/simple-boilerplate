import { ExceptionErrorHandler, ResponseExceptionHandler } from '../interfaces';

/**
 * ForbiddenException
 * Forbidden handler class to catch not autohization access.
 *
 * @implements ExceptionErrorHandler

 */
export class ForbiddenException implements ExceptionErrorHandler {
  /**
   * @var ResponseExceptionHandler
   */
  private responseHandle: ResponseExceptionHandler = {
    code: 403,
    message: 'forbidden',
    type: 'FORBIDDEN_EXCEPTION',
  };

  /**
   * Constructor of class.
   * @param String ?message
   */
  public constructor(message?: string) {
    this.responseHandle.message = message || this.responseHandle.message;
  }
}
