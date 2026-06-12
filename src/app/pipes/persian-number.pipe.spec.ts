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

  it('should format numbers with Persian digits and Persian grouping separator', () => {
    const result = pipe.transform(1234567.89);
    expect(result).toContain('۱'); // Persian digit one
    expect(result).toContain('٬'); // Persian thousands separator (U+066C)
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

  it('should map Latin digits to Persian digits in mixed (non-numeric) text', () => {
    expect(pipe.transform('سال مالی 1404 - دوره 6 ماهه')).toBe('سال مالی ۱۴۰۴ - دوره ۶ ماهه');
  });

  it('should leave non-numeric text without digits untouched', () => {
    expect(pipe.transform('تولید و فروش')).toBe('تولید و فروش');
  });
});
