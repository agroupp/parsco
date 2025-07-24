import { between } from './between.js';
import { choice } from './choice.js';
import { digits } from './digits.js';
import { lazy } from './lazy.js';
import { separatedBy } from './separated-by.js';
import { str } from './str.js';
import { Parser } from '../util/parser.js';

const betweenSquareBrackets = between<string, string, string[]>(str('['), str(']'));
const commaSeparated = separatedBy<string, string>(str(','));

describe('separatedBy', () => {
  it('should parse "[1,2,3,4,5]"', () => {
    const parser = betweenSquareBrackets(commaSeparated(digits()));

    expect(parser.run('[1,2,3,4,5]').result).toEqual(['1', '2', '3', '4', '5']);
  });

  it('should parse "[1,[2,[3],4],5]"', () => {
    const parser = lazy(() => choice([digits(), arrayParser]));
    const arrayParser = betweenSquareBrackets(commaSeparated(parser as unknown as Parser<string>));

    expect(parser.run('[1,[2,[3],4],5]').result).toEqual(['1', ['2', ['3'], '4'], '5']);
  });
});
