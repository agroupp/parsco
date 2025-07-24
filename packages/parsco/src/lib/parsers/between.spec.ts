import { between } from './between.js';
import { letters } from './letters.js';
import { str } from './str.js';
import { Parser } from '../util/parser.js';

const betweenBrackets = between<string, string, string>(str('('), str(')'));

describe('between', () => {
  let parser: Parser<string>;

  beforeEach(() => {
    parser = betweenBrackets(letters());
  });

  it('should parse the content between brackets', () => {
    expect(parser.run('(AbC)')).toHaveProperty('result', 'AbC');
  });
});
