import { filter } from 'lodash';
import * as crypto from 'crypto';
import { Constants } from './constants';
import { FiltersCriteriaTypeInterface } from './interfaces';

/**
 * Filters object.
 */
const FilterObjectCallbacks = {
  equalTo: (record: any, filter: FiltersCriteriaTypeInterface) =>
    record[filter.field] === filter.value,
  equalNot: (record: any, filter: FiltersCriteriaTypeInterface) =>
    record[filter.field] !== filter.value,
  lessThan: (record: any, filter: FiltersCriteriaTypeInterface) =>
    record[filter.field] < filter.value,
  lessThanOrEqualTo: (record: any, filter: FiltersCriteriaTypeInterface) =>
    record[filter.field] <= filter.value,
  greatherThan: (record: any, filter: FiltersCriteriaTypeInterface) =>
    record[filter.field] > filter.value,
  greatherThanEqualTo: (record: any, filter: FiltersCriteriaTypeInterface) =>
    record[filter.field] >= filter.value,
  contains: (record: any, filter: FiltersCriteriaTypeInterface) =>
    record[filter.field].includes(filter.value),
  notContains: (record: any, filter: FiltersCriteriaTypeInterface) =>
    !record[filter.field].includes(filter.value),
  isIn: (record: any, filter: FiltersCriteriaTypeInterface) =>
    filter.value.includes(record[filter.field]),
  isNotIn: (record: any, filter: FiltersCriteriaTypeInterface) =>
    !filter.value.includes(record[filter.field]),
};

/**
 * Function to normalize string.
 * @params String str
 * @return String
 */
export function hNormalizeString(str:string): string {
  return str.replace(/[^\w\s]/g, '').replace(' ', '_');
}

/**
 * Function to crypt plain text.
 * @params String toCryptString
 * @return String
 */
export function hCryptString(toCryptString: string | number): string | number {
  const key = crypto.scryptSync(`${Constants.PASSWORD_SALT}`, 'salt', 24);
  const iv = Buffer.alloc(16, 0);
  const cipher = crypto.createCipheriv(`${Constants.CRYPTO_ALGORITH}`, key, iv);

  let encrypted = cipher.update(toCryptString.toString(), 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
}

/**
 * Function to set filter for current array records.
 * @params Array<any> toDecryptString
 * @params FiltersCriteriaTypeInterface filterParams
 * @return Array<any>
 */
export function hSetFilterToArrayRecords(
  records: Array<any>,
  filterParams: FiltersCriteriaTypeInterface,
): Array<any> {
  return filter(records, record =>
    FilterObjectCallbacks[filterParams.type](record, filterParams),
  );
}

/**
 * Function to decrypt hash text.
 * @params String toDecryptString
 * @return String
 */
export function hDecryptString(toDecryptString: string): string {
  try {
    const key = crypto.scryptSync(`${Constants.PASSWORD_SALT}`, 'salt', 24);
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv(
      `${Constants.CRYPTO_ALGORITH}`,
      key,
      iv,
    );

    let decrypted = decipher.update(toDecryptString, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (error) {
    return toDecryptString;
  }
}
