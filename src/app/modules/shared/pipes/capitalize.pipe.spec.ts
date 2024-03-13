import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('should capitalize the first letter of each word in a string', () => {
    const input = 'hello world';
    const result = pipe.transform(input);
    expect(result).toEqual('Hello World');
  });

  it('should handle empty string', () => {
    const input = '';
    const result = pipe.transform(input);
    expect(result).toEqual('');
  });

  it('should handle single word', () => {
    const input = 'hello';
    const result = pipe.transform(input);
    expect(result).toEqual('Hello');
  });
});
