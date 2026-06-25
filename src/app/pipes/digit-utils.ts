const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/**
 * Maps Latin (0-9) and Arabic-Indic (٠-٩, U+0660–U+0669) digits to Persian
 * (Extended Arabic-Indic) digits ۰-۹. All other characters are untouched.
 */
export function toPersianDigits(text: string): string {
  return text.replace(/[0-9٠-٩]/g, (digit) => {
    const code = digit.charCodeAt(0);
    return PERSIAN_DIGITS[code >= 0x0660 ? code - 0x0660 : code - 0x30];
  });
}
