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

  it('should format an ISO instant as an exact Tehran-pinned Jalali date', () => {
    expect(pipe.transform('2026-06-12T12:00:00Z')).toBe('۱۴۰۵/۰۳/۲۲');
  });

  it('should format an ISO date-only string (UTC midnight) as Nowruz 1405', () => {
    expect(pipe.transform('2026-03-21')).toBe('۱۴۰۵/۰۱/۰۱');
  });

  it('should format a Date object as an exact Tehran-pinned Jalali date', () => {
    expect(pipe.transform(new Date(Date.UTC(2026, 5, 12, 12, 0, 0)))).toBe('۱۴۰۵/۰۳/۲۲');
  });

  it('should pass through already-Jalali slash strings with digits mapped to Persian', () => {
    expect(pipe.transform('1403/07/21')).toBe('۱۴۰۳/۰۷/۲۱');
  });

  it('should pass through already-Jalali dash strings with digits mapped to Persian', () => {
    expect(pipe.transform('1404-12-29')).toBe('۱۴۰۴-۱۲-۲۹');
  });

  it('should return — for an invalid date string', () => {
    expect(pipe.transform('not-a-date')).toBe('—');
  });

  it('should return — for an invalid Date object', () => {
    expect(pipe.transform(new Date('garbage'))).toBe('—');
  });
});
