import { alertActions } from "../alert.actions";
import { alertConstants } from "../../constants/alert.constants";
const section = "Run this test";

describe(`Alert actions`, () => {
  it(`should display a successful alert`, () => {
    const message = "Success";
    const expectedAction = { type: alertConstants.SUCCESS, message, section };
    expect(alertActions.success(message, section)).toEqual(expectedAction);
  });
  it(`should display a failure alert`, () => {
    const message = "Failed";
    const expectedAction = { type: alertConstants.ERROR, message, section };
    expect(alertActions.error(message, section)).toEqual(expectedAction);
  });
  it(`should clear alert`, () => {
    const expectedAction = { type: alertConstants.CLEAR };
    expect(alertActions.clear()).toEqual(expectedAction);
  });
});
