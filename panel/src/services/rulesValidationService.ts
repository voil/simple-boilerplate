/**
 * Function rules for check is value empty.
 * @returns {(value: Boolean | String | Number) => String | Null}
 */
export function isRequiredValidation(): (value: boolean | string | number) => string | null {
  return (value: boolean | string | number = '') => {
    const messageError = 'This field is a required field.';
    return !value.toString()
      ? messageError
      : (value.toString().trim() !== '' ? null : messageError);
  };
}

/**
 * Function rules for check is value has e-mail format.
 * @returns {(value: String) => String | Null}
 */
export function isEmailValidation(): (value: string) => string | null {
  return (value = '') => {
    const messageError = 'The field has an incorrect e-mail format.';
    const pattern = new RegExp(/^([A-Z0-9._+-]+)@([A-Z0-9.-]+)\.([A-Z]{2,13})$/i);
    return pattern.test(value) ? null : messageError;
  };
}

/**
 * Function rules for check is password correct.
 * @returns {(value: String) => String | Null}
 */
export function isPasswordValidation(): (value: string) => string | null {
  return (value = '') => {
    if (value.length < 8) {
      return 'The password must have 8 characters.';
    }
    if (!/[A-Z]/.test(value)) {
      return 'Password must contain one upper case letter.';
    }
    if (!/\d/.test(value)) {
      return 'Password must contain one number.';
    }
    if (/[ęóąśłżźćńĘÓĄŚŁŻŹĆŃ ]/.test(value)) {
      return 'The password cannot contain special characters.';
    }

    return null;
  };
}
