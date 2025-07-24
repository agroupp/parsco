/* eslint-disable @typescript-eslint/no-explicit-any */
import { Parser, createParser } from '../util/parser.js';
import { updateParserState } from '../util/update-parser-state.js';

/**
 * Creates a parser that runs a sequence of parsers in order, collecting their results.
 * If any parser fails, the sequence stops and returns the error state.
 *
 * @param parsers - An array of parsers to execute sequentially. The result type is inferred from the tuple of parsers provided.
 * @returns A parser that yields a tuple of results from each parser in the sequence, or an error if any parser fails.
 *
 * @example
 * ```typescript
 * import { sequenceOf } from './parsers/sequence-of';
 * import { str } from './parsers/str';
 *
 * const parser = sequenceOf([str('a'), str('b'), str('c')]);
 * const result = parser.run('abc');
 * // result.status === 'success'
 * // result.result === ['a', 'b', 'c']
 * ```
 */
export function sequenceOf<A>(parsers: [Parser<A>]): Parser<A>;
export function sequenceOf<A, B>(parsers: [Parser<A>, Parser<B>]): Parser<[A, B]>;
export function sequenceOf<A, B, C>(parsers: [Parser<A>, Parser<B>, Parser<C>]): Parser<[A, B, C]>;
export function sequenceOf<A, B, C, D>(parsers: [Parser<A>, Parser<B>, Parser<C>, Parser<D>]): Parser<[A, B, C, D]>;
export function sequenceOf<A, B, C, D, E>(
  parsers: [Parser<A>, Parser<B>, Parser<C>, Parser<D>, Parser<E>],
): Parser<[A, B, C, D, E]>;
export function sequenceOf(parsers: Parser<any>[]): Parser<any> {
  return createParser<any>(state => {
    if (state.status === 'error') {
      return state;
    }

    const results = [];
    let nextState = state;

    for (const parser of parsers) {
      nextState = parser.transformerFn(nextState);

      if (nextState.status === 'success') {
        results.push(nextState.result);
      }
    }

    return updateParserState(nextState, results);
  });
}
