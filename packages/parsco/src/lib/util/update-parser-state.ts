/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParserState } from "./parser.js";

/**
 * Updates the parser state to reflect a successful parsing operation.
 *
 * @template T The type of the result in the input parser state.
 * @param state The current parser state to update.
 * @param result The new result to set in the parser state.
 * @param index (Optional) The new index to set in the parser state. If not provided, the index remains unchanged.
 * @returns A new parser state with the updated result, index (if provided), status set to 'success', and errorMessage cleared.
 */
export function updateParserState<T>(state: ParserState<T>, result: T, index?: number): ParserState<T>;
/**
 * Updates the parser state to reflect a successful parsing operation, allowing the result type to change.
 *
 * @template T The type of the result in the input parser state.
 * @template R The type of the new result to set in the parser state.
 * @param state The current parser state to update.
 * @param result The new result to set in the parser state.
 * @param index (Optional) The new index to set in the parser state. If not provided, the index remains unchanged.
 * @returns A new parser state with the updated result, index (if provided), status set to 'success', and errorMessage cleared.
 */
export function updateParserState<T, R>(state: ParserState<T>, result: R, index?: number): ParserState<R>;
export function updateParserState(state: ParserState<any>, result: any, index?: number): ParserState<any> {
  return { ...state, result, ...(index !== undefined ? { index } : {}), status: 'success', errorMessage: undefined };
}

/**
 * Updates the parser state to reflect a parsing error, setting the status to 'error' and updating the error message.
 *
 * @template T The type of the result in the input parser state.
 * @param state The current parser state to update.
 * @param errorMessage (Optional) The error message to set in the parser state. If not provided, the error message is set to undefined.
 * @returns A new parser state with status set to 'error' and the provided error message.
 */
export function parserError<T>(state: ParserState<T>, errorMessage?: string): ParserState<T> {
  return { ...state, status: 'error', errorMessage };
}
