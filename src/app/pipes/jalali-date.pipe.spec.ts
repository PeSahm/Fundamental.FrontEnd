import { JalaliDatePipe } from './jalali-date.pipe';

describe('JalaliDatePipe', () => {
  let pipe: JalaliDatePipe;

  beforeEach(() => {
    pipe = new JalaliDatePipe();
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

  it('should format an ISO date string as a Jalali date with Persian digits in 3 parts', () => {
    const result = pipe.transform('2026-03-21'); // Nowruz-ish: Jalali year 1404 or 1405
    expect(result).toMatch(/[۰-۹]/); // contains Persian digits
    expect(result.split('/').length).toBe(3); // year/month/day
    expect(result.includes('۱۴۰۵') || result.includes('۱۴۰۴')).toBeTrue();
  });

  it('should format a Date object as a Jalali date with Persian digits', () => {
    const result = pipe.transform(new Date(2026, 2, 21)); // 2026-03-21 local time
    expect(result).toMatch(/[۰-۹]/);
    expect(result.split('/').length).toBe(3);
    expect(result.includes('۱۴۰۵') || result.includes('۱۴۰۴')).toBeTrue();
  });

  it('should return — for an invalid date string', () => {
    expect(pipe.transform('not-a-date')).toBe('—');
  });

  it('should return — for an invalid Date object', () => {
    expect(pipe.transform(new Date('garbage'))).toBe('—');
  });
});
