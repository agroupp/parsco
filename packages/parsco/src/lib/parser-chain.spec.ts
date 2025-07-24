import { digits } from './parsers/digits.js';
import { letters } from './parsers/letters.js';
import { sequenceOf } from './parsers/sequence-of.js';
import { str } from './parsers/str.js';

const stringParser = letters().map(res => ({ type: 'string', value: res }));
const numberParser = digits().map(res => ({ type: 'number', value: parseInt(res) }));
const dicerollParser = sequenceOf([digits(), str('d'), digits()]).map(([n, _, s]) => ({
  type: 'diceroll',
  value: [parseInt(n), parseInt(s)],
}));

interface Chain<T> {
  type: string;
  value: T;
}

const parserWithChain = sequenceOf([letters(), str(':')])
  .map(res => res[0])
  .chain<Chain<string>, Chain<number>, Chain<number[]>>(t => {
    switch (t) {
      case 'string':
        return stringParser;
      case 'number':
        return numberParser;
      case 'diceroll':
        return dicerollParser;
      default:
        throw new Error(`Unknown type: ${t}`);
    }
  });

describe('parserWithChain', () => {
  it('should result in the string', () => {
    const res = parserWithChain.run('string:something');
    expect(res).toHaveProperty('result.value', 'something');
    expect(res).toHaveProperty('result.type', 'string');
  });

  it('should result in the number', () => {
    const res = parserWithChain.run('number:42');
    expect(res).toHaveProperty('result.value', 42);
    expect(res).toHaveProperty('result.type', 'number');
  });

  it('should result in the array of numbers', () => {
    const res = parserWithChain.run('diceroll:2d8');
    expect(res).toHaveProperty('result.value', [2, 8]);
    expect(res).toHaveProperty('result.type', 'diceroll');
  });
});
