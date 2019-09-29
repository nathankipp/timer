import getTime from './getTime';

const tests = [
  [ 1000, '0:01.0' ],
  [ 1200, '0:01.2' ],
  [ 60000, '1:00.0' ],
  [ 60000 * 59 + 59890, '59:59.9' ]
];

describe('getTime()', () => {
  it('returns well-formatted time objects', () => {
    tests.map(([ ms, time ]) =>
      expect(getTime(ms)).toEqual(time)
    )
  });
});
