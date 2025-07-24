import { createParser, Parser } from '../util/parser.js';
import { ShouldHaveAtLeastOneResult } from '../util/should-have-at-least-one-result.js';
import { parserError, updateParserState } from '../util/update-parser-state.js';

export type ManyOptions = ShouldHaveAtLeastOneResult;

/**
 * Creates a parser that applies the given `parser` repeatedly to the input,
 * collecting all successful results into an array. Parsing stops when the
 * underlying parser fails or produces no result.
 *
 * If the `options.shouldHaveAtLeastOneResult` flag is set and no results are
 * collected, the parser returns an error.
 *
 * @typeParam T - The type of the result produced by the underlying parser.
 * @param parser - The parser to apply repeatedly.
 * @param options - Optional settings, including whether at least one result is required.
 * @returns A parser that returns an array of results.
 *
 * @example
 * ```typescript
 * import { many } from './parsers/many';
 * import { char } from './parsers/char';
 *
 * // Parse one or more 'a' characters
 * const parser = many(char('a'), { shouldHaveAtLeastOneResult: true });
 * const result = parser.run('aaab');
 * // result.status === 'success'
 * // result.result === ['a', 'a', 'a']
 * ```
 */
export function many<T>(parser: Parser<T>, options?: ManyOptions): Parser<T[]> {
  return createParser<T, T[]>(state => {
    if (state.status === 'error') {
      return state;
    }

    const results: T[] = [];
    let nextState = state;
    let done = false;

    while (!done) {
      nextState = parser.transformerFn(nextState);

      if (nextState.status === 'success' && nextState.result) {
        results.push(nextState.result);
      } else {
        done = true;
      }
    }

    if (!results.length && options?.shouldHaveAtLeastOneResult) {
      return parserError(state, `many: Couldn't get even one result.`);
    }

    return updateParserState<T, T[]>(nextState, results);
  });
}
