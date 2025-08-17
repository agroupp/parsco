import { createParser, Parser, ParserState } from '../util/parser.js';
import { ShouldHaveAtLeastOneResult } from '../util/should-have-at-least-one-result.js';
import { parserError, updateParserState } from '../util/update-parser-state.js';

/**
 * Options for the `separatedBy` parser combinator.
 * Extends {@link ShouldHaveAtLeastOneResult} to optionally require at least one result.
 */
export type SeparatedByOptions = ShouldHaveAtLeastOneResult;

/**
 * Creates a parser that parses a sequence of values separated by a given separator.
 *
 * @typeParam S - The type of the separator parser's result.
 * @typeParam T - The type of the value parser's result.
 * @param separatorParser - Parser that matches the separator between values.
 * @param options - Optional configuration, such as requiring at least one result.
 * @returns A function that takes a value parser and returns a parser for an array of values separated by the separator.
 *
 * @example
 * ```typescript
 * import { separatedBy } from './parsers/separated-by';
 * import { char } from './util/parser';
 *
 * // Parser for comma-separated digits
 * const comma = char(',');
 * const digit = char(/[0-9]/);
 * const digitsSeparatedByComma = separatedBy(comma) (digit);
 *
 * const result = digitsSeparatedByComma.parse('1,2,3');
 * console.log(result.result); // Output: ['1', '2', '3']
 * ```
 */
export function separatedBy<S, T>(
  separatorParser: Parser<S>,
  options?: SeparatedByOptions,
): (valueParser: Parser<T>) => Parser<T[]> {
  return (valueParser: Parser<T>) =>
    createParser<T, T[]>(state => {
      if (state.status === 'error') {
        return state;
      }

      const results: T[] = [];
      let nextState: ParserState<T | S> = state;

      while (true) {
        const valueState = valueParser.transformerFn(nextState as ParserState<T>);

        if (valueState.status === 'error') {
          break;
        }

        if (valueState.result) {
          results.push(valueState.result);
        }

        nextState = valueState;

        const separatorState = separatorParser.transformerFn(nextState as ParserState<S>);

        if (separatorState.status === 'error') {
          break;
        }

        nextState = separatorState;
      }

      if (options?.shouldHaveAtLeastOneResult && results.length === 0) {
        return parserError(state, `separatedBy: Unable to capture any results at index ${state.index}`);
      }

      return updateParserState(nextState, results);
    });
}
