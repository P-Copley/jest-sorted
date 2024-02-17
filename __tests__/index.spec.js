const { toBeSorted, toBeSortedBy } = require('../src/sorted');

describe('toBeSorted', () => {
  describe('expect.toBeSorted', () => {
    it('extends jest.expect', () => {
      expect(typeof expect.toBeSorted).toBe('function');
    });
  });

  describe('flat arrays', () => {
    it('pass: empty arrays are considered sorted', () => {
      expect(toBeSorted([]).pass).toBe(true);
    });
    it('pass: array of ascending numbers', () => {
      expect(toBeSorted([1, 2, 3]).pass).toBe(true);
    });
    it('fail: array of ascending numbers', () => {
      expect(toBeSorted([3, 2, 1]).pass).toBe(false);
    });
    it('pass: array of equal numbers are considered sorted', () => {
      expect(toBeSorted([2, 2, 2]).pass).toBe(true);
    });
    it('fail: array of ascending numbers to a point', () => {
      expect(toBeSorted([1, 2, 1]).pass).toBe(false);
    });
    it('pass: array of ascending numbers message provided for .not case', () => {
      expect(toBeSorted([1, 2, 3]).message()).toBe(
        'Expected [1,2,3] to not be sorted in ascending order'
      );
    });
    it('fail: array of ascending numbers message provided', () => {
      expect(toBeSorted([3, 2, 1]).message()).toBe(
        'Expected [3,2,1] to be sorted in ascending order\nExpected 3 to be after 2'
      );
    });
    it('pass - { descending: true }: array of descending numbers', () => {
      expect(toBeSorted([3, 2, 1], { descending: true }).pass).toBe(true);
    });
    it('fail - { descending: true }: array of descending numbers', () => {
      expect(toBeSorted([1, 2, 3], { descending: true }).pass).toBe(false);
    });
    it('pass - { descending: true }: array of descending numbers message provided for .not case', () => {
      expect(toBeSorted([3, 2, 1], { descending: true }).message()).toBe(
        'Expected [3,2,1] to not be sorted in descending order'
      );
    });
    it('fail - { descending: true }: array of descending numbers message provided', () => {
      expect(toBeSorted([1, 2, 3], { descending: true }).message()).toBe(
        'Expected [1,2,3] to be sorted in descending order\nExpected 2 to be before 1'
      );
    });
  });

  describe('array of objects', () => {
    const ascendingObjs = [{ num: 1 }, { num: 2 }, { num: 3 }];
    const descendingObjs = [{ num: 3 }, { num: 2 }, { num: 1 }];
    it('fail - { descending: true }: array of ascending numbers message provided', () => {
      expect(toBeSorted(ascendingObjs, { descending: true, key: "num" }).pass).toBe(false);
      expect(toBeSorted(ascendingObjs, { descending: true, key: "num" }).message()).toBe(
        'Expected Array(3) to be sorted by num in descending order\nExpected 2 to be before 1'
      );
    });
    it('fail - { descending: false }: array of descending numbers message provided', () => {
      expect(toBeSorted(descendingObjs, { descending: false, key: "num" }).pass).toBe(false);
      expect(toBeSorted(descendingObjs, { descending: false, key: "num" }).message()).toBe(
        'Expected Array(3) to be sorted by num in ascending order\nExpected 3 to be after 2'
      );
    });
    it('pass - { descending: true }: array of descending numbers', () => {
      expect(toBeSorted(descendingObjs, { descending: true, key: "num" }).pass).toBe(true);
    });
    it('pass - { descending: false }: array of ascending numbers', () => {
      expect(toBeSorted(ascendingObjs, { descending: false, key: "num" }).pass).toBe(true);
    });
    it('pass - { key: "sortKey" }: uses the passed key to sort nested objects', () => {
      expect(toBeSorted(ascendingObjs, { key: 'num' }).pass).toBe(true);
    });
    it('fail - { key: "sortKey" }: uses the passed key to sort nested objects', () => {
      expect(toBeSorted(descendingObjs, { key: 'num' }).pass).toBe(false);
    });
    it('pass - { key: "sortKey" }: message provided for .not case includes a passed key', () => {
      expect(toBeSorted(ascendingObjs, { key: 'num' }).message()).toBe(
        'Expected Array(3) to not be sorted by num in ascending order'
      );
    });
    it('fail - { key: "sortKey" }: message provided includes a passed key', () => {
      expect(toBeSorted(descendingObjs, { key: 'num' }).message()).toBe(
        'Expected Array(3) to be sorted by num in ascending order\nExpected 3 to be after 2'
      );
    });
    it('fail - { key: "missingKey" }: fails for a non-existant key', () => {
      expect(toBeSorted(ascendingObjs, { key: 'missing' }).pass).toBe(false);
    });
    it('fail - { key: "missingKey" }: message provided specifies the missing key', () => {
      expect(toBeSorted(ascendingObjs, { key: 'missing' }).message()).toBe(
        'Expected Array(3) to be sorted by a missing key, missing, in ascending order'
      );
    });
    it('pass - { key: "missingKey", strict: "false" }: passes in non-strict mode as all values are undefined', () => {
      expect(
        toBeSorted(ascendingObjs, { key: 'missing', strict: false }).pass
      ).toBe(true);
    });
    it('fail - { key: "missingKey", strict: "false" }: message provided for the .not case specifies the missing key', () => {
      expect(
        toBeSorted(ascendingObjs, { key: 'missing', strict: false }).message()
      ).toBe(
        'Expected Array(3) to not be sorted by missing in ascending order'
      );
    });
  });

  describe('number coercion', () => {
    const ascendingStrings = ['2', '12', '123'];
    const descendingStrings = ['223', '12', '1'];
    it('pass - { coerce: true }: coerces values to Numbers before comparison', () => {
      expect(toBeSorted(ascendingStrings, { coerce: true }).pass).toBe(true);
    });
    it('fail - { coerce: true }: coerces values to Numbers before comparison', () => {
      expect(toBeSorted(descendingStrings, { coerce: true }).pass).toBe(false);
    });
  });

  describe('flat sets', () => {
    const unsortedSet = new Set([1, 8, 3, 207]);
    const ascendingSet = new Set([5, 8, 24, 300]);
    it('fail: unsorted set of numbers', () => {
      expect(toBeSorted(unsortedSet).pass).toBe(false);
    });

    it('pass: set with ascending numbers', () => {
      expect(toBeSorted(ascendingSet).pass).toBe(true);
    });
  });

  describe('non-iterables', () => {
    it('fail: all non-iterables are considered unsorted', () => {
      expect(toBeSorted(1).pass).toBe(false);
      expect(toBeSorted(1).message()).toBe(
        `1 is not iterable and cannot be sorted`
      );
    });
  });

  describe('string elements', () => {
    it('fail: message surrounds string elements in double quotes', () => {
      expect(toBeSorted(['5', '10']).message()).toBe(
        'Expected [5,10] to be sorted in ascending order\nExpected "5" to be after "10"'
      );
    });
  });

  describe('toBeSortedBy', () => {
    const ascendingObjs = [{ num: '1' }, { num: '2' }, { num: '3' }];
    const descendingObjs = [{ num: 3 }, { num: 2 }, { num: 1 }];
    it('extends jest.expect', () => {
      expect(typeof expect.toBeSortedBy).toBe('function');
    });
    it('is an alias for toBeSorted with the key option', () => {
      expect(toBeSortedBy(ascendingObjs, 'num').pass).toBe(true);
      expect(toBeSortedBy(descendingObjs, 'num').pass).toBe(false);
    });
    it('options are passed to toBeSorted', () => {
      expect(
        toBeSortedBy(ascendingObjs, 'num', { descending: true }).pass
      ).toBe(false);
    });
    it('key option is not passed, always uses the first argument', () => {
      expect(
        toBeSortedBy(ascendingObjs, 'num', { descending: true, key: 'missing' })
          .pass
      ).toBe(false);
    });
  });

  describe('compare function', () => {
    const compare = (a, b) => a.localeCompare(b);
    it('pass - for default compare function', () => {
      expect(toBeSorted([1, 2, 3]).pass).toBe(true);
    });
    it('fail - for default compare function', () => {
      expect(toBeSorted([3, 2, 1]).pass).toBe(false);
    });
    it('pass - descending with default compare function', () => {
      expect(toBeSorted([3, 2, 1], { descending: true }).pass).toBe(true);
    });
    it('pass - for sorted with compare function', () => {
      const sorted = ['a', 'bb', 'aa.a'].sort(compare);
      expect(toBeSorted(sorted, { compare }).pass).toBe(true);
    });
    it('fail - for sorted with compare function but descending', () => {
      const sorted = ['a', 'bb', 'aa.a'].sort(compare);
      expect(toBeSorted(sorted, { compare, descending: true }).pass).toBe(
        false
      );
    });
    it('pass - for descending sorted with compare function', () => {
      const descSorted = ['a', 'ba', 'a.b.c', 'aa.a'].sort(
        (a, b) => -compare(a, b)
      );
      expect(toBeSorted(descSorted, { descending: true, compare }).pass).toBe(
        true
      );
    });
  });
});
