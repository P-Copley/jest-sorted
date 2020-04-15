const { toBeSorted, toBeSortedBy } = require("../src/sorted");

describe("toBeSorted", () => {
  describe("expect.toBeSorted", () => {
    it("extends jest.expect", () => {
      expect(typeof expect.toBeSorted).toBe("function");
    });
  });

  describe("flat arrays", () => {
    it("pass: empty arrays are considered sorted", () => {
      expect(toBeSorted([]).pass).toBe(true);
    });
    it("pass: array of ascending numbers", () => {
      expect(toBeSorted([1, 2, 3]).pass).toBe(true);
    });
    it("fail: array of ascending numbers", () => {
      expect(toBeSorted([3, 2, 1]).pass).toBe(false);
    });
    it("pass: array of equal numbers are considered sorted", () => {
      expect(toBeSorted([2, 2, 2]).pass).toBe(true);
    });
    it("fail: array of ascending numbers to a point", () => {
      expect(toBeSorted([1, 2, 1]).pass).toBe(false);
    });
    it("pass: array of ascending numbers message provided for .not case", () => {
      expect(toBeSorted([1, 2, 3]).message()).toBe(
        "Expected [1,2,3] to not be sorted in ascending order"
      );
    });
    it("fail: array of ascending numbers message provided", () => {
      expect(toBeSorted([3, 2, 1]).message()).toBe(
        "Expected [3,2,1] to be sorted in ascending order"
      );
    });
    it("pass - { descending: true }: array of descending numbers", () => {
      expect(toBeSorted([3, 2, 1], { descending: true }).pass).toBe(true);
    });
    it("fail - { descending: true }: array of descending numbers", () => {
      expect(toBeSorted([1, 2, 3], { descending: true }).pass).toBe(false);
    });
    it("pass - { descending: true }: array of descending numbers message provided for .not case", () => {
      expect(toBeSorted([3, 2, 1], { descending: true }).message()).toBe(
        "Expected [3,2,1] to not be sorted in descending order"
      );
    });
    it("fail - { descending: true }: array of descending numbers message provided", () => {
      expect(toBeSorted([1, 2, 3], { descending: true }).message()).toBe(
        "Expected [1,2,3] to be sorted in descending order"
      );
    });
  });

  describe("array of objects", () => {
    const ascendingObjs = [{ num: 1 }, { num: 2 }, { num: 3 }];
    const descendingObjs = [{ num: 3 }, { num: 2 }, { num: 1 }];
    it('pass - { key: "sortKey" }: uses the passed key to sort nested objects', () => {
      expect(toBeSorted(ascendingObjs, { key: "num" }).pass).toBe(true);
    });
    it('fail - { key: "sortKey" }: uses the passed key to sort nested objects', () => {
      expect(toBeSorted(descendingObjs, { key: "num" }).pass).toBe(false);
    });
    it('pass - { key: "sortKey" }: message provided for .not case includes a passed key', () => {
      expect(toBeSorted(ascendingObjs, { key: "num" }).message()).toBe(
        "Expected Array(3) to not be sorted by num in ascending order"
      );
    });
    it('fail - { key: "sortKey" }: message provided includes a passed key', () => {
      expect(toBeSorted(descendingObjs, { key: "num" }).message()).toBe(
        "Expected Array(3) to be sorted by num in ascending order"
      );
    });
  });

  describe("number coercion", () => {
    const ascendingStrings = ["2", "12", "123"];
    const descendingStrings = ["223", "12", "1"];
    it("pass - { coerce: true }: coerces values to Numbers before comparison", () => {
      expect(toBeSorted(ascendingStrings, { coerce: true }).pass).toBe(true);
    });
    it("fail - { coerce: true }: coerces values to Numbers before comparison", () => {
      expect(toBeSorted(descendingStrings, { coerce: true }).pass).toBe(false);
    });
  });

  describe("toBeSortedBy", () => {
    const ascendingObjs = [{ num: 1 }, { num: 2 }, { num: 3 }];
    const descendingObjs = [{ num: 3 }, { num: 2 }, { num: 1 }];
    it("extends jest.expect", () => {
      expect(typeof expect.toBeSortedBy).toBe("function");
    });
    it("is an alias for toBeSorted with the key option", () => {
      expect(toBeSortedBy(ascendingObjs, "num").pass).toBe(true);
      expect(toBeSortedBy(descendingObjs, "num").pass).toBe(false);
    });
    it("options are passed to toBeSorted", () => {
      expect(
        toBeSortedBy(ascendingObjs, "num", { descending: true }).pass
      ).toBe(false);
    });
    it("key option is not passed, always uses the first argument", () => {
      expect(
        toBeSortedBy(ascendingObjs, "num", { descending: true, key: "missing" })
          .pass
      ).toBe(false);
      console.log(expect.toBeSortedBy.toString());
      expect(ascendingObjs).toBeSortedBy({ key: "num", descending: true });
    });
  });
});
