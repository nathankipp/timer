import keyGen from './keyGen';

describe('keyGen()', () => {
  it('returns a trio of values for use as session/local storage keys', () => {
    expect(keyGen('foo')).toEqual({
      STORAGE_KEY: 'foo',
      RUNNING_KEY: 'foo.running',
      STARTED_KEY: 'foo.started',
    });
  });
});
