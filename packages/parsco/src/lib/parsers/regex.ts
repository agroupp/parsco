import { Parser, createParser } from '../util/parser.js';
import { updateParserState, parserError } from '../util/update-parser-state.js';

export function regex(regExp: RegExp, errorMessage?: string): Parser<string> {
  return createParser(state => {
    const { target, index, status } = state;

    if (status === 'error') {
      return state;
    }

    const slicedTarget = target.slice(index);

    if (!slicedTarget.length) {
      return parserError(state, `letters: Unexpected end of input.`);
    }

    const regexMatch = slicedTarget.match(regExp);

    return regexMatch?.[0]?.length ? updateParserState(state, regexMatch[0], index + regexMatch[0].length) : parserError(state, `${errorMessage ?? "regex: Couldn't match any regexp"} @ index ${index}`);
  });
}
