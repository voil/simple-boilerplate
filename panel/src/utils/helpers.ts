/**
 * Helper function to change first character to lower case.
 * @param {String} text
 * @returns {String}
 */
export function hFirstToLower(text: string): string {
  return `${text[0].toLocaleLowerCase()}${text.slice(1)}`;
}

/**
 * Helper function to change first character to upper case.
 * @param {String} text
 * @returns {String}
 */
export function hFirstToUpper(text: string): string {
  return `${text[0].toLocaleUpperCase()}${text.slice(1)}`;
}
