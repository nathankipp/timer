import computeMillis from './computeMillis';

const MIN = 1000 * 60;
const SEC = 1000;

describe('computeMillis()', () => {
  it('converts a human-readable time to milliseconds', () => {
    expect(computeMillis('1')).toBe(SEC);
    expect(computeMillis('1.1')).toBe(SEC + 100);
    expect(computeMillis('60')).toBe(MIN);
    expect(computeMillis('1:00')).toBe(MIN);
    expect(computeMillis('120')).toBe(MIN * 2);
    expect(computeMillis('2:00')).toBe(MIN * 2);
    expect(computeMillis('59:59')).toBe(MIN * 59 + SEC * 59);
  });
});
