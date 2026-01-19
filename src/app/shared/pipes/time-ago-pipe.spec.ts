import '@utils/dayjs.config';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TimeAgoPipe } from './time-ago-pipe';

describe('TimeAgoPipe', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-10T00:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('creates an instance', () => {
    const pipe = new TimeAgoPipe();
    expect(pipe).toBeTruthy();
  });

  it('formats a relative time string', () => {
    const pipe = new TimeAgoPipe();
    const value = new Date('2024-01-09T00:00:00.000Z');
    expect(pipe.transform(value)).toBe('a day ago');
  });
});
