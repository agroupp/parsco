/**
 * Add:       (+ 10 2)
 * Subtract:  (- 10 2)
 * Multiply:  (* 10 2)
 * Divide:    (/ 10 2)
 *
 * Nested calculations:   (+ (* 10 2) (- 10 2))
 */

import { between, choice, digits, lazy, Parser, sequenceOf, str } from 'parsco';

interface Expression {
  op: string;
  a: NumberResult | OperationResult;
  b: NumberResult | OperationResult;
}

interface NumberResult {
  type: 'number';
  value: number;
}

interface OperationResult {
  type: 'operation';
  value: Expression;
}

type OperationSequence = [string, string, OperationResult | NumberResult, string, OperationResult | NumberResult];

const betweenBrackets = between<string, string, OperationSequence>(str('('), str(')'));
const space = str(' ');
const numberParser = digits().map<NumberResult>(d => ({ type: 'number', value: Number(d) }));
const operatorParser = choice([str('+'), str('-'), str('*'), str('/')]);
const expr = lazy((): Parser<NumberResult | OperationResult> => choice([numberParser, operationParser]));
const operationParser = betweenBrackets(sequenceOf([operatorParser, space, expr, space, expr])).map<OperationResult>(
  res => ({
    type: 'operation',
    value: {
      op: res[0],
      a: res[2],
      b: res[4],
    },
  }),
);

function evaluate(node: NumberResult | OperationResult): number {
  if (node.type === 'number') {
    return node.value;
  }

  const { value } = node;

  switch (value.op) {
    case '+':
      return evaluate(value.a) + evaluate(value.b);
    case '-':
      return evaluate(value.a) - evaluate(value.b);
    case '*':
      return evaluate(value.a) * evaluate(value.b);
    case '/':
      return evaluate(value.a) / evaluate(value.b);
    default:
      throw new Error('Unknown operation');
  }
}

function interpreter(src: string): number {
  const parsed = expr.run(src);

  if (parsed.status === 'error' || !parsed.result) {
    throw new Error('Syntax error');
  }

  return evaluate(parsed.result);
}

const src = '(+ (* 10 2) (- (/ 50 3) 2))';

console.log('AST', JSON.stringify(expr.run(src), null, '  '));

console.log('Calculation result:', interpreter(src));
