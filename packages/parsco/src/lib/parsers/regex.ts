import { Parser, createParser } from '../util/parser.js';
import { updateParserState, parserError } from '../util/update-parser-state.js';

/**
 * Creates a parser that matches the input against a given regular expression.
 *
 * The parser attempts to match the provided RegExp at the current position in the input.
 * If a match is found, it advances the parser state and returns the matched string.
 * If no match is found, it returns an error with the provided error message or a default message.
 *
 * @param regExp - The regular expression to match against the input.
 * @param errorMessage - Optional custom error message to use when no match is found.
 * @returns A parser that returns the matched string or an error if no match is found.
 *
 * @example
 * ```typescript
 * import { regex } from './parsers/regex';
 * import { runParser } from './util/parser';
 *
 * const digitParser = regex(/^\d+/);
 * const result = runParser(digitParser, '123abc');
 * // result.value === '123'
 * // result.status === 'ok'
 * ```
 */
export function regex(regExp: RegExp, errorMessage?: string): Parser<string> {
  return createParser(state => {
    const { target, index, status } = state;

    if (status === 'error') {
      return state;
    }

    const slicedTarget = target.slice(index);

    if (!slicedTarget.length) {
      return parserError(state, `letters: Unexpected end of input.`);
    }

    const regexMatch = slicedTarget.match(regExp);

    return regexMatch?.[0]?.length
      ? updateParserState(state, regexMatch[0], index + regexMatch[0].length)
      : parserError(state, `${errorMessage ?? "regex: Couldn't match any regexp"} @ index ${index}`);
  });
}
