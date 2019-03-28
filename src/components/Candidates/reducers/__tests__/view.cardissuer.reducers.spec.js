import { viewCardIssuer } from "../view.cardissuer.reducers";
import { cardIssuersConstants } from "../../constants/action.constants";

const initialState = {
  fetching: false,
  fetched: false,
  request: null,
  response: null,
  error: null
};

describe("card issuers reducer", () => {
  it("should return the initial state", () => {
    expect(viewCardIssuer(undefined, {})).toEqual(initialState);
  });

  it("should handle VIEW_CARDISSUERS_RESET", () => {
    expect(
      viewCardIssuer(initialState, {
        type: cardIssuersConstants.VIEW_CARDISSUER_RESET
      })
    ).toEqual(initialState);
  });

  it("should handle VIEW_CARDISSUERS_REQUEST", () => {
    expect(
      viewCardIssuer(initialState, {
        type: cardIssuersConstants.VIEW_CARDISSUER_REQUEST,
        id: 44
      })
    ).toEqual({
      ...initialState,
      fetching: true,
      request: 44
    });
  });

  it("should handle VIEW_CARDISSUERS_SUCCESS", () => {
    expect(
      viewCardIssuer(initialState, {
        type: cardIssuersConstants.VIEW_CARDISSUER_SUCCESS,
        response: { data: [] }
      })
    ).toEqual({
      ...initialState,
      response: { data: [] },
      fetched: true
    });
  });

  it("should handle VIEW_CARDISSUER_FAILURE", () => {
    expect(
      viewCardIssuer(initialState, {
        type: cardIssuersConstants.VIEW_CARDISSUER_FAILURE,
        error: { data: [] }
      })
    ).toEqual({
      ...initialState,
      error: { data: [] }
    });
  });
});
