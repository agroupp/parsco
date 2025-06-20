import { Parser } from '../util/parser.js';
import { regex } from './regex.js';

const LETTERS_REGEX = new RegExp(/^[A-Za-z]+/, 'g');

export function letters(): Parser<string> {
  return regex(LETTERS_REGEX, `letters: Couldn't match any letters`);
}
