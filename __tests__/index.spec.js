const { toBeSorted } = require("../src/sorted");

describe("toBeSorted", () => {
  describe("expect.toBeSorted", () => {
    it("extends jest.expect", () => {
      expect(typeof expect.toBeSorted).toBe("function");
    });
  });

  describe("flat arrays", () => {
    it("pass: array of ascending numbers", () => {
      expect(toBeSorted([1, 2, 3]).pass).toBe(true);
      expect(toBeSorted([1, 2, 3]).message()).toBe(
        "Expected [1,2,3] to not be sorted in ascending order"
      );
    });
  });
});
