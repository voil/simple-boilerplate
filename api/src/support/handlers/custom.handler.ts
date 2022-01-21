import { ExceptionErrorHandler, ResponseExceptionHandler } from '../interfaces';

/**
 * CustomException
 * Custom handler class to catch custom errors.
 *
 * @implements ExceptionErrorHandler

 */
export class CustomException implements ExceptionErrorHandler {
  /**
   * @var ResponseExceptionHandler
   */
  private responseHandle: ResponseExceptionHandler = {
    code: 406,
    message: '',
    type: 'CUSTOM_EXCEPTION',
  };

  /**
   * Constructor of class.
   * @param String ?message
   */
  public constructor(message?: string) {
    this.responseHandle.message = message || this.responseHandle.message;
  }

  /**
   * Handle custom exception.
   * @return ResponseExceptionHandler
   */
  public handle(): ResponseExceptionHandler {
    return this.responseHandle;
  }
}
