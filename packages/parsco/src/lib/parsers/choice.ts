/* eslint-disable @typescript-eslint/no-explicit-any */
import { Parser, createParser } from '../util/parser.js';
import { parserError } from '../util/update-parser-state.js';

export function choice<A>(parsers: [Parser<A>]): Parser<A>;
export function choice<A, B>(parsers: [Parser<A>, Parser<B>]): Parser<[A, B]>;
export function choice<A, B, C>(parsers: [Parser<A>, Parser<B>, Parser<C>]): Parser<[A, B, C]>;
export function choice<A, B, C, D>(parsers: [Parser<A>, Parser<B>, Parser<C>, Parser<D>]): Parser<[A, B, C, D]>;
export function choice<A, B, C, D, E>(parsers: [Parser<A>, Parser<B>, Parser<C>, Parser<D>, Parser<E>]): Parser<[A, B, C, D, E]>;
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

    return parserError(state, `choice: Unable to match any parser @ index ${state.index}`);
  });
}
