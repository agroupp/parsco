import { regex } from './regex.js';
import { Parser } from '../util/parser.js';

const REGEX = new RegExp(/^[A-Z]+/, 'g');
const ERROR_MESSAGE = 'ERROR_MESSAGE';

describe('regex', () => {
  let parser: Parser<string>;

  beforeEach(() => {
    parser = regex(REGEX, ERROR_MESSAGE);
  });

  it('should parse matching regular expression', () => {
    expect(parser.run('ABC')).toHaveProperty('status', 'success');
  });

  it('should have error if no match for the regular expression', () => {
    expect(parser.run('123')).toHaveProperty('status', 'error');
  });
});
