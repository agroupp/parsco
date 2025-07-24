import { str } from './str.js';
import { Parser, ParserState } from '../util/parser.js';

const PARSER_VALUE = 'PARSER_VALUE';
const INCORRECT_VALUE = 'INCORRECT_VALUE';
const EXPECTED_CORRECT_VALUE: ParserState<string> = {
  errorMessage: undefined,
  index: PARSER_VALUE.length,
  result: PARSER_VALUE,
  status: 'success',
  target: PARSER_VALUE,
};

const EXPECTED_INCORRECT_VALUE: ParserState<string> = {
  errorMessage: 'str: Failed to match the "PARSER_VALUE", but recieved "INCORRECT_VALUE"',
  index: 0,
  status: 'error',
  target: INCORRECT_VALUE,
};

describe('str', () => {
  let parser: Parser<string>;

  beforeEach(() => {
    parser = str(PARSER_VALUE);
  });

  it('should parse the correct string', () => {
    expect(parser.run(PARSER_VALUE)).toEqual(EXPECTED_CORRECT_VALUE);
  });

  it('should return error for incorrect string', () => {
    expect(parser.run(INCORRECT_VALUE)).toEqual(EXPECTED_INCORRECT_VALUE);
  });
});
