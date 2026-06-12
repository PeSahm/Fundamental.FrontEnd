import { PersianNumberPipe } from './persian-number.pipe';

describe('PersianNumberPipe', () => {
  let pipe: PersianNumberPipe;

  beforeEach(() => {
    pipe = new PersianNumberPipe();
  });

  it('should return — for null', () => {
    expect(pipe.transform(null)).toBe('—');
  });

  it('should return — for undefined', () => {
    expect(pipe.transform(undefined)).toBe('—');
  });

  it('should return — for empty string', () => {
    expect(pipe.transform('')).toBe('—');
  });

  it('should return — for whitespace-only string', () => {
    expect(pipe.transform('   ')).toBe('—');
  });

  it('should return — for non-finite numbers', () => {
    expect(pipe.transform(Infinity)).toBe('—');
    expect(pipe.transform(NaN)).toBe('—');
  });

  it('should format decimal numbers with Persian digits, grouping and decimal separator', () => {
    expect(pipe.transform(1234567.89)).toBe('۱٬۲۳۴٬۵۶۷٫۸۹');
  });

  it('should format zero as Persian zero', () => {
    expect(pipe.transform(0)).toBe('۰');
  });

  it('should format negative numbers with Persian digits', () => {
    const result = pipe.transform(-500);
    expect(result).toContain('۵۰۰');
  });

  it('should parse numeric strings with Latin digits and commas, then format', () => {
    expect(pipe.transform('1,234')).toBe('۱٬۲۳۴');
  });

  it('should parse plain numeric strings, then format', () => {
    expect(pipe.transform('1234567')).toBe('۱٬۲۳۴٬۵۶۷');
  });

  it('should parse decimal numeric strings, then format', () => {
    expect(pipe.transform('1234.5')).toBe('۱٬۲۳۴٫۵');
  });

  it('should parse negative numeric strings with commas, then format', () => {
    // fa-IR renders the sign as U+200E (LRM) + U+2212 (minus) before the digits
    const result = pipe.transform('-1,234');
    expect(result).toContain('۱٬۲۳۴');
    expect(result).toContain('−');
  });

  it('should map Latin digits to Persian digits in mixed (non-numeric) text', () => {
    expect(pipe.transform('سال مالی 1404 - دوره 6 ماهه')).toBe('سال مالی ۱۴۰۴ - دوره ۶ ماهه');
  });

  it('should map Arabic-Indic digits (U+0660-U+0669) to Persian digits', () => {
    expect(pipe.transform('٤٥٦')).toBe('۴۵۶');
    expect(pipe.transform('مبلغ ٠١٢٣٤٥٦٧٨٩ ریال')).toBe('مبلغ ۰۱۲۳۴۵۶۷۸۹ ریال');
  });

  it('should pass the Infinity string through the text branch unchanged', () => {
    expect(pipe.transform('Infinity')).toBe('Infinity');
  });

  it('should route hex strings to the text-mapping branch instead of parsing', () => {
    expect(pipe.transform('0x1F')).toBe('۰x۱F');
  });

  it('should route exponent strings to the text-mapping branch instead of parsing', () => {
    expect(pipe.transform('1e3')).toBe('۱e۳');
  });

  it('should leave non-numeric text without digits untouched', () => {
    expect(pipe.transform('تولید و فروش')).toBe('تولید و فروش');
  });
});
