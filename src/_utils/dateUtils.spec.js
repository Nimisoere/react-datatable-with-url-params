import { dateUtils } from "./dateUtils";

describe("async actions", () => {
  it("should calculate age properly", () => {
    expect(dateUtils.calculateAge("1992")).toEqual(27);
  });
});