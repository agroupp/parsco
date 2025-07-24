import { letters, digits, sequenceOf, str } from 'parsco';

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

console.log('string:something', parserWithChain.run('string:something'));
console.log('number:42', parserWithChain.run('number:42'));
console.log('diceroll:2d8', parserWithChain.run('diceroll:2d8'));
