/* eslint-disable @typescript-eslint/no-explicit-any */
import { Parser, createParser } from '../util/parser.js';
import { updateParserState } from '../util/update-parser-state.js';

export function sequenceOf<A>(parsers: [Parser<A>]): Parser<A>;
export function sequenceOf<A, B>(parsers: [Parser<A>, Parser<B>]): Parser<[A, B]>;
export function sequenceOf<A, B, C>(parsers: [Parser<A>, Parser<B>, Parser<C>]): Parser<[A, B, C]>;
export function sequenceOf<A, B, C, D>(parsers: [Parser<A>, Parser<B>, Parser<C>, Parser<D>]): Parser<[A, B, C, D]>;
export function sequenceOf<A, B, C, D, E>(parsers: [Parser<A>, Parser<B>, Parser<C>, Parser<D>, Parser<E>]): Parser<[A, B, C, D, E]>;
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
