import { Parser } from '../util/parser.js';
import { regex } from './regex.js';

const DIGITS_REGEX = new RegExp(/^[0-9]+/, 'g');

export function digits(): Parser<string> {
  return regex(DIGITS_REGEX, `digits: Couldn't match any digits`);
}
