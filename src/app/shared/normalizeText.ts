/**
 * Normalize a text by converting it to lowercase, trimming whitespace at the beginning and end,
 * and removing diacritical marks.
 * @param {string} text - The text to normalize.
 * @returns {string} The normalized text.
 * @example
 * normalizeText("Hello World!"); // Returns "hello world!"
 * @example
 * normalizeText("Héllò Wórld!"); // Returns "hello world!"
 */
export const normalizeText = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
};
