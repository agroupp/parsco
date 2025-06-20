import { ParserFn, createParser } from '../util/parser.js';
import { updateParserState, parserError } from '../util/update-parser-state.js';

export const str: ParserFn<string> = source => {
  return createParser<string>(state => {
    const { target, index, status } = state;

    if (status === 'error') {
      return state;
    }

    return target.slice(index).startsWith(source) ? updateParserState(state, source, index + source.length) : parserError(state, `str: Failed to match the "${source}", but recieved "${target}"`);
  });
};
