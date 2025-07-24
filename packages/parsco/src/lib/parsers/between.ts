/* eslint-disable @typescript-eslint/no-explicit-any */
import { sequenceOf } from './sequence-of.js';
import { Parser } from '../util/parser.js';

/**
 * Creates a parser that matches a value between two other parsers.
 *
 * The returned parser will first apply the `start` parser, then the provided `parser`, and finally the `end` parser.
 * Only the result of the middle `parser` is returned, discarding the results of `start` and `end`.
 *
 * @typeParam A - The type of the result from the `start` parser.
 * @typeParam B - The type of the result from the `end` parser.
 * @typeParam C - The type of the result from the middle `parser`.
 * @typeParam D - The type of the final result (optional, for advanced use cases).
 * @param start - The parser to match at the beginning.
 * @param end - The parser to match at the end.
 * @returns A function that takes a parser and returns a new parser that matches the value between `start` and `end`.
 *
 * @example
 * ```typescript
 * const betweenBrackets = between(char('['), char(']'));
 * const parser = betweenBrackets(str('hello'));
 * // Matches "[hello]" and returns "hello"
 * ```
 */
export function between<A, B, C>(start: Parser<A>, end: Parser<B>): (parser: Parser<C>) => Parser<C>;
export function between<A, B, C, D>(start: Parser<A>, end: Parser<B>): (parser: Parser<C>) => Parser<D>;
export function between(start: Parser<any>, end: Parser<any>): (parser: Parser<any>) => Parser<any> {
  return (parser: Parser<any>) => sequenceOf([start, parser, end]).map(res => res[1]);
}
