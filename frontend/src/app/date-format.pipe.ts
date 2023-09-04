import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date): string {
    if (!value) {
      return '';
    }

    const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: '2-digit',
    };

    return value.toLocaleDateString('en-US', options);
  }
}
