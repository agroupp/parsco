import { createParser, Parser } from "../util/parser.js";
import { parserError, updateParserState } from "../util/update-parser-state.js";

export interface ManyOptions {
  shouldHaveAtLeastOneResult?: boolean;
}

export function many<T>(parser: Parser<T>, options?: ManyOptions) {
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
