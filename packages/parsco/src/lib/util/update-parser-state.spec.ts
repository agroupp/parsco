import { ParserState } from './parser.js';
import { updateParserState, parserError } from './update-parser-state.js';

const SRC_TARGET = 'SRC_TARGET';
const RESULT_STR = 'RESULT_STR';
const RESULT_NUM = 42;
const INDEX = 12;
const SRC_STATE: ParserState<string> = { target: SRC_TARGET, index: 0 };
const ERROR_MSG = 'ERROR_MSG';

describe('updateParserState', () => {
  it('should update the source with the result', () => {
    expect(updateParserState(SRC_STATE, RESULT_STR, INDEX)).toEqual({
      ...SRC_STATE,
      index: INDEX,
      result: RESULT_STR,
      status: 'success',
    });
  });

  it('should update the source with the result of different type', () => {
    expect(updateParserState(SRC_STATE, RESULT_NUM, INDEX)).toEqual({
      ...SRC_STATE,
      index: INDEX,
      result: RESULT_NUM,
      status: 'success',
    });
  });
});

describe('parserError', () => {
  it('should create the error parser state', () => {
    expect(parserError(SRC_STATE, ERROR_MSG)).toEqual({
      errorMessage: ERROR_MSG,
      index: 0,
      target: SRC_TARGET,
      status: 'error',
    });
  });
});
