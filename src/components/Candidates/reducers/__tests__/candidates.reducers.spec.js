import { candidates } from "../candidates.reducers";
import { candidateConstants } from "../../constants/action.constants";

const initialState = {
  fetching: false,
  fetched: false,
  response: null,
  error: null
};

describe("candidates reducer", () => {
  it("should return the initial state", () => {
    expect(candidates(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_CANDIDATE_RESET", () => {
    expect(
      candidates(initialState, {
        type: candidateConstants.GET_CANDIDATE_RESET
      })
    ).toEqual(initialState);
  });

  it("should handle GET_CANDIDATE_REQUEST", () => {
    expect(
      candidates(initialState, {
        type: candidateConstants.GET_CANDIDATE_REQUEST
      })
    ).toEqual({
      ...initialState,
      fetching: true
    });
  });

  it("should handle GET_CANDIDATE_SUCCESS", () => {
    expect(
      candidates(initialState, {
        type: candidateConstants.GET_CANDIDATE_SUCCESS,
        response: { data: [] }
      })
    ).toEqual({
      ...initialState,
      response: { data: [] },
      fetched: true
    });
  });

  it("should handle GET_CANDIDATE_FAILURE", () => {
    expect(
      candidates(initialState, {
        type: candidateConstants.GET_CANDIDATE_FAILURE,
        error: { data: [] }
      })
    ).toEqual({
      ...initialState,
      error: { data: [] }
    });
  });
});
