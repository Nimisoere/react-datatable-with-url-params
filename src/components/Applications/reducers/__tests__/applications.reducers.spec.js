import { applications } from "../applications.reducers";
import { applicationConstants } from "../../constants/action.constants";

const initialState = {
  fetching: false,
  fetched: false,
  response: null,
  error: null
};

describe("applications reducer", () => {
  it("should return the initial state", () => {
    expect(applications(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_APPLICATION_RESET", () => {
    expect(
      applications(initialState, {
        type: applicationConstants.GET_APPLICATION_RESET
      })
    ).toEqual(initialState);
  });

  it("should handle GET_APPLICATION_REQUEST", () => {
    expect(
      applications(initialState, {
        type: applicationConstants.GET_APPLICATION_REQUEST
      })
    ).toEqual({
      ...initialState,
      fetching: true
    });
  });

  it("should handle GET_APPLICATION_SUCCESS", () => {
    expect(
      applications(initialState, {
        type: applicationConstants.GET_APPLICATION_SUCCESS,
        response: { data: [] }
      })
    ).toEqual({
      ...initialState,
      response: { data: [] },
      fetched: true
    });
  });

  it("should handle GET_APPLICATION_FAILURE", () => {
    expect(
      applications(initialState, {
        type: applicationConstants.GET_APPLICATION_FAILURE,
        error: { data: [] }
      })
    ).toEqual({
      ...initialState,
      error: { data: [] }
    });
  });
});
