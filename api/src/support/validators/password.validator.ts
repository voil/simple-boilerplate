import {
  ValidationOptions,
  registerDecorator,
  ValidatorConstraint,
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';
import { CustomException } from '../handlers/custom.handler';

/**
 * CheckIsPasswordCorrect
 * Check is password corrent.
 *
 * @implements ValidatorConstraintInterface

 */
@ValidatorConstraint({ async: true })
export class CheckIsPasswordCorrect implements ValidatorConstraintInterface {
  /**
   * Method to validate password is correct.
   * @params String value
   * @params ValidationArguments args
   */
  validate(value: string, args: ValidationArguments) {
    if(!value) {
      return true;
    }
    if (value.length < 8) {
      throw new CustomException('The password must have 8 characters!');
    }
    if (!/[A-Z]/.test(value)) {
      throw new CustomException('Password must contain one upper case letter!');
    }
    if (!/\d/.test(value)) {
      throw new CustomException('Password must contain one number!');
    }
    if (/[ęóąśłżźćńĘÓĄŚŁŻŹĆŃ ]/.test(value)) {
      throw new CustomException(
        'The password cannot contain special characters!',
      );
    }

    return true;
  }
}

/**
 * Method to register dynamic decorator for check is password value correct.
 * @params ValidationOptions? validationOptions
 * @return Function
 */
export function IsPassword(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CheckIsPasswordCorrect,
    });
  };
}
