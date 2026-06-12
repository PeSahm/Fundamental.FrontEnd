import { Pipe, PipeTransform } from '@angular/core';

const EMPTY_PLACEHOLDER = '—';
const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/**
 * Renders numbers with Persian digits and Persian grouping (fa-IR locale).
 * - null/undefined/'' → '—'
 * - numbers and numeric strings (Latin digits, optional commas) → localized fa-IR format
 * - other strings → Latin digits mapped to Persian digits, remaining characters untouched
 */
@Pipe({ name: 'persianNumber' })
export class PersianNumberPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return EMPTY_PLACEHOLDER;
    }

    if (typeof value === 'number') {
      return Number.isFinite(value) ? value.toLocaleString('fa-IR') : EMPTY_PLACEHOLDER;
    }

    const numericCandidate = value.replace(/,/g, '').trim();
    if (numericCandidate !== '' && !Number.isNaN(Number(numericCandidate))) {
      return Number(numericCandidate).toLocaleString('fa-IR');
    }

    return value.replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[+digit]);
  }
}
