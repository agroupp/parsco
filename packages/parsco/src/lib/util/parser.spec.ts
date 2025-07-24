import { createParser } from './parser.js';
import { parserError, updateParserState } from './update-parser-state.js';

const TARGET = 'TARGET';

describe('Parser', () => {
  it('should run the transformer function', () => {
    const parser = createParser(vitest.fn());
    const transformerFnSpy = vitest.spyOn(parser, 'transformerFn');

    parser.run(TARGET);
    expect(transformerFnSpy).toHaveBeenCalledOnce();
    expect(transformerFnSpy).toHaveBeenCalledWith({ target: TARGET, index: 0 });
  });

  it('should map the parser result', () => {
    const source = 'source';
    const parser = createParser<string>(state => {
      const { target, index, status } = state;

      if (status === 'error') {
        return state;
      }

      return target.slice(index).startsWith(source)
        ? updateParserState(state, source, index + source.length)
        : parserError(state, `str: Failed to match the "${source}", but recieved "${target}"`);
    });

    expect(parser.map(res => res.toUpperCase()).run(source)).toHaveProperty('result', source.toUpperCase());
  });

  it('should map the error message', () => {
    const source = 'source';
    const parser = createParser<string>(state => {
      const { target, index, status } = state;

      if (status === 'error') {
        return state;
      }

      return target.slice(index).startsWith(source)
        ? updateParserState(state, source, index + source.length)
        : parserError(state, `str: Failed to match the "${source}", but recieved "${target}"`);
    });

    expect(parser.mapErrorMsg((msg, i) => `New msg contains ${msg} & index: ${i}`).run('!' + source)).toHaveProperty(
      'errorMessage',
      'New msg contains str: Failed to match the "source", but recieved "!source" & index: 0',
    );
  });
});
