import {alert as alertReducer} from "../alert.reducer";
import { alertConstants } from "../../constants/alert.constants";

const initialState = {};
const section = "Run this test";

describe("Alert reducer", () => {
  it("should return the initial state", () => {
    expect(alertReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle alert SUCCESS", () => {
    const successAction = {
      type: alertConstants.SUCCESS,
      message: "success",
      section
    };
    expect(alertReducer({}, successAction)).toEqual({
      type: "success",
      message: "success",
      section
    });
  });

  it("should handle alert Error", () => {
    const errorAction = {
      type: alertConstants.ERROR,
      message: "Oops!",
      section
    };
    expect(alertReducer({}, errorAction)).toEqual({
      type: "error",
      message: "Oops!",
      section
    });
  });

  it("should handle alert CLEAR", () => {
    const clearAction = {
      type: alertConstants.CLEAR
    };
    expect(alertReducer({}, clearAction)).toEqual({});
  });
});
