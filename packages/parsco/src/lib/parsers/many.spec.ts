import { choice } from './choice.js';
import { digits } from './digits.js';
import { letters } from './letters.js';
import { many } from './many.js';
import { Parser } from '../util/parser.js';

describe('many', () => {
  let parser: Parser<string[]>;

  beforeEach(() => {
    parser = many(choice([digits(), letters()]));
  });

  it('should parse digits', () => {
    expect(parser.run('123')).toHaveProperty('result', ['123']);
  });

  it('should parse letters', () => {
    expect(parser.run('ABC')).toHaveProperty('result', ['ABC']);
  });

  it('should parse both digits and letters', () => {
    expect(parser.run('123abc')).toHaveProperty('result', ['123', 'abc']);
    expect(parser.run('123abc')).toHaveProperty('errorMessage', undefined);
  });

  it('should result with an empty array', () => {
    expect(parser.run('!+=')).toHaveProperty('result', []);
  });
});
