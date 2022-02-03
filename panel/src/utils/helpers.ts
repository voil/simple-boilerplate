/**
 * Helper function to change first character to lower case.
 * @param {String} text
 * @returns {String}
 */
export function hFirstToLower(text: string): string {
  return `${text[0].toLocaleLowerCase()}${text.slice(1)}`;
}
