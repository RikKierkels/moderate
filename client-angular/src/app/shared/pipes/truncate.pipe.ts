import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  pure: true
})
export class TruncatePipe implements PipeTransform {
  transform(text = '', maxWordCount: number, suffix = '...'): string {
    const words = text.split(' ');

    if (words.length <= maxWordCount) {
      return text;
    }

    text = words.slice(0, maxWordCount).join(' ');
    text = text.endsWith('.') ? text.slice(0, -1) : text;
    return `${text} ${suffix}`;
  }
}
