import { createParser, Parser } from '../util/parser.js';

/**
 * Creates a parser that defers the creation of its underlying parser until it is needed.
 * Useful for defining recursive parsers where the parser definition refers to itself.
 *
 * @typeParam T - The type of the value produced by the parser.
 * @param parserThunk - A function that returns a `Parser<T>`. This function is called lazily when parsing.
 * @returns A `Parser<T>` that delegates parsing to the parser returned by `parserThunk`.
 *
 * @example
 * // Recursive parser for nested parentheses
 * import { lazy } from './lazy';
 * import { char, seq } from './otherParsers';
 *
 * const parens = lazy(() =>
 *   seq(
 *     char('('),
 *     parens.or(char('a')), // recursive reference
 *     char(')')
 *   )
 * );
 *
 * // Usage: parens.parse('(a)')
 */
export function lazy<T>(parserThunk: () => Parser<T>): Parser<T> {
  return createParser<T>(state => parserThunk().transformerFn(state));
}
