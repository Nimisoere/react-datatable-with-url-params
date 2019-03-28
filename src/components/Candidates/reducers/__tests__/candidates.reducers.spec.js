import { cardIssuers } from "../cardissuer.reducers";
import { cardIssuersConstants } from "../../constants/action.constants";

const initialState = {
  fetching: false,
  fetched: false,
  response: null,
  error: null
};

describe("card issuers reducer", () => {
  it("should return the initial state", () => {
    expect(cardIssuers(undefined, {})).toEqual(initialState);
  });

  it("should handle GET_CARDISSUERS_RESET", () => {
    expect(cardIssuers(initialState, {
      type: cardIssuersConstants.GET_CARDISSUERS_RESET
    })).toEqual(initialState);
  });

  it("should handle GET_CARDISSUERS_REQUEST", () => {
    expect(
      cardIssuers(initialState, {
        type: cardIssuersConstants.GET_CARDISSUERS_REQUEST
      })
    ).toEqual({
      ...initialState,
      fetching: true
    });
  });

  it("should handle GET_CARDISSUERS_SUCCESS", () => {
    expect(
      cardIssuers(initialState, {
        type: cardIssuersConstants.GET_CARDISSUERS_SUCCESS,
        response: {data:[]}
      })
    ).toEqual({
      ...initialState,
      response:{data:[]},
      fetched: true
    });
  });

  it("should handle GET_CARDISSUERS_ERROR", () => {
    expect(
      cardIssuers(initialState, {
        type: cardIssuersConstants.GET_CARDISSUERS_FAILURE,
        error: {data:[]}
      })
    ).toEqual({
      ...initialState,
      error:{data:[]},
    });
  });
});
