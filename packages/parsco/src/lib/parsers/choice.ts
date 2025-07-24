/* eslint-disable @typescript-eslint/no-explicit-any */
import { Parser, createParser } from '../util/parser.js';
import { parserError } from '../util/update-parser-state.js';

/**
 * Attempts to parse the input using a list of parsers, returning the result of the first successful parser.
 * If none of the parsers succeed, returns an error state.
 *
 * @param parsers - An array of parsers to try in order.
 * @returns A parser that tries each parser in the array and returns the first successful result.
 *
 * @example
 * ```typescript
 * const digitParser = regex(/[0-9]/);
 * const letterParser = regex(/[a-zA-Z]/);
 * const parser = choice([digitParser, letterParser]);
 *
 * const result = parser.parse("7abc");
 * // result.status === 'success'
 * // result.value === '7'
 * ```
 */
export function choice<A>(parsers: [Parser<A>]): Parser<A>;
export function choice<A, B>(parsers: [Parser<A>, Parser<B>]): Parser<A | B>;
export function choice<A, B, C>(parsers: [Parser<A>, Parser<B>, Parser<C>]): Parser<A | B | C>;
export function choice<A, B, C, D>(parsers: [Parser<A>, Parser<B>, Parser<C>, Parser<D>]): Parser<A | B | C | D>;
export function choice<A, B, C, D, E>(
  parsers: [Parser<A>, Parser<B>, Parser<C>, Parser<D>, Parser<E>],
): Parser<A | B | C | D | E>;
export function choice(parsers: Parser<any>[]): Parser<any> {
  return createParser<any>(state => {
    if (state.status === 'error') {
      return state;
    }

    for (const parser of parsers) {
      const nextState = parser.transformerFn(state);

      if (nextState.status === 'success') {
        return nextState;
      }
    }

    return parserError(state, `choice: Unable to match with any parser @ index ${state.index}`);
  });
}
