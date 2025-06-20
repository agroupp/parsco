import { str, sequenceOf, letters, digits, choice, many } from 'parsco';

// const parser = sequenceOf([str('hello there'), str('bye')]);
const parser = str('hello').map(res => ({ value: res.toUpperCase() })).mapErrorMsg((msg, i) => `Expected "hello" @ index ${i}`);

// console.log(parser.run('hello therebye'));
// console.log(many<string>(choice([letters(), digits(), letters()]).run('x123abc')));
console.log(many(choice([digits(), letters()]), { shouldHaveAtLeastOneResult: true }).map(res => [...res].reverse()).run('a42b'));
