import { ParserFn, createParser } from '../util/parser.js';
import { updateParserState, parserError } from '../util/update-parser-state.js';

/**
 * Creates a parser that matches a specific string at the current position in the input.
 *
 * @param source - The string to match in the input.
 * @returns A parser function that succeeds if the input starts with the given string, otherwise fails.
 *
 * @example
 * ```typescript
 * import { str } from './parsers/str';
 * import { runParser } from './util/parser';
 *
 * const parser = str('hello');
 * const result = runParser(parser, 'hello world');
 * console.log(result.status); // Output: 'ok'
 * console.log(result.value);  // Output: 'hello'
 * ```
 */
export const str: ParserFn<string> = source => {
  return createParser<string>(state => {
    const { target, index, status } = state;

    if (status === 'error') {
      return state;
    }

    return target.slice(index).startsWith(source)
      ? updateParserState(state, source, index + source.length)
      : parserError(state, `str: Failed to match the "${source}", but recieved "${target}"`);
  });
};
