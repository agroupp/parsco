/* eslint-disable @typescript-eslint/no-explicit-any */
import { parserError, updateParserState } from './update-parser-state.js';

/**
 * Represents the status of a parser operation.
 * Can be either 'success' or 'error'.
 */
type ParserStateStatus = 'success' | 'error';

/**
 * Represents the state of the parser at any point during parsing.
 * @template T The type of the result produced by the parser.
 */
export interface ParserState<T> {
  /**
   * The input string being parsed.
   */
  target: string;
  /**
   * The current position in the input string.
   */
  index: number;
  /**
   * The result of the parser if parsing was successful.
   */
  result?: T;
  /**
   * The error message if parsing failed.
   */
  errorMessage?: string;
  /**
   * The status of the parser, either 'success' or 'error'.
   */
  status?: ParserStateStatus;
}

/**
 * A function that takes a parser state and returns a new parser state, potentially transforming the result type.
 * @template T The input type of the parser state.
 * @template U The output type of the parser state (defaults to T).
 */
export type TransformerFn<T, U = T> = (state: ParserState<T>) => ParserState<U | T>;

/**
 * A function that takes a source of type T and returns a Parser<T>.
 * @template T The type of the source and parser result.
 */
export type ParserFn<T> = (source: T) => Parser<T>;

/**
 * Represents a parser that can process an input string and produce a result of type T.
 * Provides methods for running the parser and transforming its result or error message.
 * @template T The type of the result produced by the parser.
 */
export class Parser<T> {
  /**
   * Creates a new Parser instance.
   * @param transformerFn The function that defines how the parser transforms its state.
   */
  constructor(readonly transformerFn: TransformerFn<T>) {}

  /**
   * Runs the parser on the given input string, starting at index 0.
   * @param target The input string to parse.
   * @returns The final ParserState<T> after parsing.
   */
  run(target: string): ParserState<T> {
    const initialState: ParserState<T> = { target, index: 0 };

    return this.transformerFn(initialState);
  }

  /**
   * Transforms the result of the parser using the provided callback function, returning a new parser with the transformed result type.
   * @template U The type of the transformed result.
   * @param callbackfn A function to transform the parser's result.
   * @returns A new Parser<U>.
   */
  map<U = T>(callbackfn: (result: T) => U): Parser<U> {
    const transformerFn: TransformerFn<T, U> = state => {
      const nextState = this.transformerFn(state);

      if (nextState.status === 'error' || !nextState.result) {
        return nextState;
      }

      return updateParserState<T, U>(nextState, callbackfn(nextState.result));
    };

    return createParser(transformerFn);
  }

  /**
   * Parses the next value based on the result of parsing of the current one (contextual parsing).
   *
   * @example
   * For 'string:something' will return 'something' as a string. For 'number:42' will return 42 as a number.
   * @param callbackfn
   */
  chain<A>(callbackfn: (result: T) => Parser<A>): Parser<A>;
  chain<A, B>(callbackfn: (result: T) => Parser<A> | Parser<B>): Parser<A | B>;
  chain<A, B, C>(callbackfn: (result: T) => Parser<A> | Parser<B> | Parser<C>): Parser<A | B | C>;
  chain(callbackfn: (result: T) => Parser<any>): Parser<any> {
    const transformerFn: TransformerFn<T, any> = state => {
      const nextState = this.transformerFn(state);

      if (nextState.status === 'error' || !nextState.result) {
        return nextState;
      }

      const nextParser = callbackfn(nextState.result);

      return nextParser.transformerFn(nextState);
    };

    return createParser(transformerFn);
  }

  /**
   * Transforms the error message of the parser using the provided callback function, returning a new parser with the updated error message.
   * @param callbackfn A function to transform the error message and index.
   * @returns A new Parser<T>.
   */
  mapErrorMsg(callbackfn: (result: string | undefined, index: number) => string): Parser<T> {
    const transformerFn: TransformerFn<T> = state => {
      const nextState = this.transformerFn(state);

      if (nextState.status !== 'error') {
        return nextState;
      }

      return parserError(nextState, callbackfn(nextState.errorMessage, nextState.index));
    };

    return createParser(transformerFn);
  }
}

/**
 * Factory function to create a new Parser instance from a transformer function.
 * @template T The input type of the parser state.
 * @template U The output type of the parser state.
 * @param transformerFn The function that defines how the parser transforms its state.
 * @returns A new Parser instance.
 */
export function createParser<T>(transformerFn: TransformerFn<T>): Parser<T>;
export function createParser<T, U>(transformerFn: TransformerFn<T, U>): Parser<U>;
export function createParser(transformerFn: TransformerFn<any, any>): Parser<any> {
  return new Parser(transformerFn);
}
