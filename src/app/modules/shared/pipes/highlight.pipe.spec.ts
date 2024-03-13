import { HighlightPipe } from './highlight.pipe';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

describe('HighlightPipe', () => {
  let pipe: HighlightPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    sanitizer = jasmine.createSpyObj('DomSanitizer', [
      'bypassSecurityTrustHtml',
    ]);
    pipe = new HighlightPipe(sanitizer);
  });

  it('should return the original string if no match is found', () => {
    const value = 'The quick brown fox jumps over the lazy dog';
    const args = 'cat';

    const result = pipe.transform(value, args);

    expect(result).toEqual(value);
  });

  it('should return the original string if no args provided', () => {
    const value = 'The quick brown fox jumps over the lazy dog';

    const result = pipe.transform(value, '');

    expect(result).toEqual(value);
  });

  it('should sanitize the transformed value', () => {
    const value = 'The quick brown fox jumps over the lazy dog';
    const args = 'fox';
    const expected = 'The quick brown <mark>fox</mark> jumps over the lazy dog';

    pipe.transform(value, args);

    expect(sanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(expected);
  });

});
