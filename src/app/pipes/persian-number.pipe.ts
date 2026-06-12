import { Pipe, PipeTransform } from '@angular/core';
import { toPersianDigits } from './digit-utils';

const EMPTY_PLACEHOLDER = '—';
const NUMERIC_STRING = /^-?[\d,]+(\.\d+)?$/;

/**
 * Renders numbers with Persian digits and Persian grouping (fa-IR locale).
 * - null/undefined/empty/whitespace-only → '—'
 * - finite numbers and numeric strings (Latin digits, optional commas and
 *   decimal part) → localized fa-IR format
 * - other strings (incl. hex like '0x1F' and exponents like '1e3') → Latin
 *   and Arabic-Indic digits mapped to Persian digits, the rest untouched
 */
@Pipe({ name: 'persianNumber' })
export class PersianNumberPipe implements PipeTransform {
  private static readonly numberFormatter = new Intl.NumberFormat('fa-IR');

  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined) {
      return EMPTY_PLACEHOLDER;
    }

    if (typeof value === 'number') {
      return Number.isFinite(value)
        ? PersianNumberPipe.numberFormatter.format(value)
        : EMPTY_PLACEHOLDER;
    }

    const trimmed = value.trim();
    if (trimmed === '') {
      return EMPTY_PLACEHOLDER;
    }

    if (NUMERIC_STRING.test(trimmed)) {
      const parsed = Number(trimmed.replace(/,/g, ''));
      if (Number.isFinite(parsed)) {
        return PersianNumberPipe.numberFormatter.format(parsed);
      }
    }

    return toPersianDigits(trimmed);
  }
}
