import { digits } from './digits.js';
import { Parser } from '../util/parser.js';

describe('letters', () => {
  let parser: Parser<string>;

  beforeEach(() => {
    parser = digits();
  });

  it('should parse matching regular expression', () => {
    expect(parser.run('123')).toHaveProperty('status', 'success');
  });

  it('should have error if no match for the regular expression', () => {
    expect(parser.run('ABC')).toHaveProperty('status', 'error');
  });
});
