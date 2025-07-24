import { regex } from './regex.js';
import { Parser } from '../util/parser.js';

/**
 * Regular expression that matches one or more consecutive digits at the beginning of a string.
 *
 * The pattern `/^[0-9]+/` ensures that the match starts at the beginning of the string (`^`)
 * and consists of one or more digits (`[0-9]+`). The global flag (`g`) allows matching multiple
 * occurrences in a string when used with methods like `matchAll`.
 */
const DIGITS_REGEX = new RegExp(/^[0-9]+/, 'g');

/**
 * Creates a parser that matches one or more consecutive digits at the beginning of the input.
 *
 * @returns {Parser<string>} A parser that parses digit sequences and returns them as strings.
 *
 * @example
 * digits().parse("123abc"); // returns "123"
 * digits().parse("abc"); // throws an error: "digits: Couldn't match any digits"
 */
export function digits(): Parser<string> {
  return regex(DIGITS_REGEX, `digits: Couldn't match any digits`);
}
