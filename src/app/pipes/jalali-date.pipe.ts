import { Pipe, PipeTransform } from '@angular/core';

const EMPTY_PLACEHOLDER = '—';

/**
 * Renders Gregorian dates (ISO strings or Date objects) as Jalali (Persian
 * calendar) dates with Persian digits, e.g. ۱۴۰۵/۰۱/۰۱.
 * Falsy or unparseable values → '—'.
 */
@Pipe({ name: 'jalali' })
export class JalaliDatePipe implements PipeTransform {
  private static readonly formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  transform(value: string | Date | null | undefined): string {
    if (!value) {
      return EMPTY_PLACEHOLDER;
    }

    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return EMPTY_PLACEHOLDER;
    }

    return JalaliDatePipe.formatter.format(date);
  }
}
