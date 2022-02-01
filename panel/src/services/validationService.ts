/**
 * @interface {ValidationServiceInterface}
 */
interface ValidationServiceInterface {
  isValid(value: boolean | string | number, rules: any[]): string | null;
}

/**
 * ValidationService
 * Validation service.
 *
 * @implements ValidationServiceInterface
 */
class ValidationService implements ValidationServiceInterface {
  /**
   * Method to check is value valid.
   * @param {Boolean | String | Number} value 
   * @param {Any[]} rules 
   * @returns {String | Null}
   */
  public isValid(value: boolean | string | number, rules: any[]): string | null {
    let errorMessage: string | null = null;
    rules.forEach((rule: any) => {
      errorMessage = !errorMessage? rule.apply(this, [value]) : errorMessage;
    });
    return errorMessage;
  }
}

export default new ValidationService();