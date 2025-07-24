import { choice } from './choice.js';
import { digits } from './digits.js';
import { letters } from './letters.js';
import { Parser } from '../util/parser.js';

describe('choice', () => {
  let parser: Parser<string>;

  beforeEach(() => {
    // Match either digits or letters
    parser = choice([digits(), letters()]);
  });

  it('should parse digits', () => {
    expect(parser.run('123')).toHaveProperty('result', '123');
  });

  it('should parse letters', () => {
    expect(parser.run('ABC')).toHaveProperty('result', 'ABC');
  });

  it('should parse digits only', () => {
    expect(parser.run('123abc')).toHaveProperty('result', '123');
  });
});
