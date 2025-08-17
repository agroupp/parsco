import { sequenceOf } from './sequence-of.js';
import { str } from './str.js';
import { Parser, ParserState } from '../util/parser.js';

const SRC_STR_1 = 'SRC_STR_1';
const SRC_STR_2 = 'SRC_STR_2';
const TARGET_STR = SRC_STR_1 + SRC_STR_2;
const EXPECTED_CORRECT_VALUE: ParserState<[string, string]> = {
  errorMessage: undefined,
  target: TARGET_STR,
  index: SRC_STR_1.length + SRC_STR_2.length,
  status: 'success',
  result: [SRC_STR_1, SRC_STR_2],
};

const PARTIALLY_CORRECT_TARGET = SRC_STR_1 + '!';
const INCORRECT_TARGET = 'INCORRECT_TARGET';

describe('sequenceOf', () => {
  let parser: Parser<[string, string]>;

  beforeEach(() => {
    parser = sequenceOf([str(SRC_STR_1), str(SRC_STR_2)]);
  });

  it('should parse the sequence', () => {
    expect(parser.run(TARGET_STR)).toEqual(EXPECTED_CORRECT_VALUE);
  });

  it('should return partial result for partially correct target', () => {
    expect(parser.run(PARTIALLY_CORRECT_TARGET)).toEqual({
      result: SRC_STR_1,
      index: SRC_STR_1.length,
      target: PARTIALLY_CORRECT_TARGET,
      status: 'error',
      errorMessage: 'str: Failed to match the "SRC_STR_2", but recieved "SRC_STR_1!"',
    });
  });

  it('should return empty result for incorrect target', () => {
    expect(parser.run(INCORRECT_TARGET)).toEqual({
      status: 'error',
      index: 0,
      target: INCORRECT_TARGET,
      errorMessage: 'str: Failed to match the "SRC_STR_1", but recieved "INCORRECT_TARGET"',
    });
  });
});
