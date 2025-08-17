# Parsco

**Parsco** is a TypeScript library for building powerful, composable parsers using the parser combinator pattern. It provides a set of small, reusable parsing tools that can be combined to create complex grammars and interpreters, all without the need for separate tokenization or external parser generators.

## Features

- Composable parser combinators: Build complex parsers by combining simple ones.
- Functional API: Parsers are pure functions and can be chained, mapped, and composed.
- TypeScript support: Strong typing for parser results and state.
- Contextual and recursive parsing: Easily handle context-sensitive and nested grammars.
- Extensible: Add your own combinators or extend existing ones.

## Installation

```bash
npm install parsco
```

## Quick Start

```typescript
import { str, digits, letters, sequenceOf, choice } from 'parsco';

// Match a specific string
const helloParser = str('hello');

// Match a sequence of letters
const wordParser = letters();

// Match a sequence of digits
const numberParser = digits();

// Combine parsers: match a word followed by a number
const wordAndNumber = sequenceOf([wordParser, numberParser]);

const result = wordAndNumber.run('abc123');
console.log(result); // { status: 'success', result: ['abc', '123'], ... }
```

## Example: Contextual Parsing

```typescript
import { letters, digits, sequenceOf, str } from 'parsco';

const stringParser = letters().map((res) => ({ type: 'string', value: res }));
const numberParser = digits().map((res) => ({
  type: 'number',
  value: parseInt(res),
}));

const parserWithChain = sequenceOf([letters(), str(':')])
  .map((res) => res[0])
  .chain((type) => {
    switch (type) {
      case 'string':
        return stringParser;
      case 'number':
        return numberParser;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

console.log(parserWithChain.run('string:something')); // { type: 'string', value: 'something' }
console.log(parserWithChain.run('number:42')); // { type: 'number', value: 42 }
```

## Example: Recursive Parsing

```typescript
import { between, choice, digits, lazy, sequenceOf, str } from 'parsco';

// Arithmetic expression parser: (+ (* 10 2) (- 10 2))
const numberParser = digits().map((d) => ({
  type: 'number',
  value: Number(d),
}));
const operatorParser = choice([str('+'), str('-'), str('*'), str('/')]);
const expr = lazy(() => choice([numberParser, operationParser]));
const operationParser = between(
  str('('),
  str(')')
)(sequenceOf([operatorParser, str(' '), expr, str(' '), expr])).map((res) => ({
  type: 'operation',
  value: { op: res[0], a: res[2], b: res[4] },
}));

const src = '(+ (* 10 2) (- (/ 50 3) 2))';
console.log(expr.run(src));
```

## API Overview

- `str(string)`: Match an exact string.
- `digits()`: Match one or more digits.
- `letters()`: Match one or more letters.
- `sequenceOf([parser1, parser2, ...])`: Run parsers in sequence.
- `choice([parser1, parser2, ...])`: Try parsers in order, return first success.
- `many(parser, options?)`: Repeat a parser zero or more times.
- `between(start, end)(parser)`: Match a parser between two delimiters.
- `lazy(fn)`: Define recursive parsers.
- `.map(fn)`: Transform parser result.
- `.chain(fn)`: Contextual parsing based on previous result.

See the [parser-combinators.md](../../parser-combinators.md) for a conceptual introduction.

## Building & Testing

```bash
nx build parsco
nx test parsco
```

## Gratitude & Inspiration

Special thanks to [Low Byte Productions](https://youtube.com/@lowbyteproductions?si=g-tzwy0UUqHRNU-b) for his inspiring content on parser combinators and functional programming. His videos provided valuable insights and motivation for this project.

## License

MIT
