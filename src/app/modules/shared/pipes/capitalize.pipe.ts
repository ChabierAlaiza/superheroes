import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true,
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    const splitString = value
      .split(' ')
      .map((string) => `${string?.[0]?.toUpperCase() || ''}${string.slice(1)}`);
    return splitString.join(' ');
  }
}
