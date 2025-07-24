import { regex } from './regex.js';
import { Parser } from '../util/parser.js';

/**
 * Regular expression that matches one or more consecutive English letters (A-Z, a-z) at the start of a string.
 *
 * - Uses the global flag (`g`) to find all matches in the input string.
 * - Anchored to the beginning of the string with `^`.
 * - Only matches uppercase and lowercase English alphabetic characters.
 */
const LETTERS_REGEX = new RegExp(/^[A-Za-z]+/, 'g');

/**
 * Creates a parser that matches one or more consecutive English letters (A-Z, a-z) at the beginning of the input.
 *
 * @returns {Parser<string>} A parser that extracts a string of letters from the input.
 *
 * @example
 * const parser = letters();
 * const result = parser.parse('Hello123');
 * // result.value === 'Hello'
 */
export function letters(): Parser<string> {
  return regex(LETTERS_REGEX, `letters: Couldn't match any letters`);
}
