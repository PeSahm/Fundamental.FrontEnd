import { Pipe, PipeTransform } from '@angular/core';
import { toPersianDigits } from './digit-utils';

const EMPTY_PLACEHOLDER = '—';
const JALALI_STRING = /^1[34]\d{2}[\/-]/;

/**
 * Renders Gregorian dates (ISO strings or Date objects) as Jalali (Persian
 * calendar) dates with Persian digits in the Asia/Tehran timezone,
 * e.g. ۱۴۰۵/۰۱/۰۱.
 * Input must be a Gregorian ISO string or a Date; strings that are already
 * Jalali (e.g. '1403/07/21' or '1403-07-21') pass through with their digits
 * mapped to Persian instead of being misparsed as Gregorian.
 * Falsy or unparseable values → '—'.
 */
@Pipe({ name: 'jalali' })
export class JalaliDatePipe implements PipeTransform {
  private static readonly formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Tehran',
  });

  transform(value: string | Date | null | undefined): string {
    if (!value) {
      return EMPTY_PLACEHOLDER;
    }

    if (typeof value === 'string' && JALALI_STRING.test(value)) {
      return toPersianDigits(value);
    }

    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return EMPTY_PLACEHOLDER;
    }

    return JalaliDatePipe.formatter.format(date);
  }
}
