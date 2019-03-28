import { addCardIssuer } from "../add.cardissuer.reducers";
import { cardIssuersConstants } from "../../constants/action.constants";

const initialState = {
    submitting: false,
    submitted: false,
    request: null,
    response: null,
    error: null
};

describe("card issuers reducer", () => {
  it("should return the initial state", () => {
    expect(addCardIssuer(undefined, {})).toEqual(initialState);
  });

  it("should handle ADD_CARDISSUERS_RESET", () => {
    expect(addCardIssuer(initialState, {
      type: cardIssuersConstants.ADD_CARDISSUER_RESET
    })).toEqual(initialState);
  });

  it("should handle ADD_CARDISSUERS_REQUEST", () => {
    expect(
      addCardIssuer(initialState, {
        type: cardIssuersConstants.ADD_CARDISSUER_REQUEST,
        requestBody: {data:{}}
      })
    ).toEqual({
      ...initialState,
      submitting: true,
      request: {data:{}}
    });
  });

  it("should handle ADD_CARDISSUERS_SUCCESS", () => {
    expect(
      addCardIssuer(initialState, {
        type: cardIssuersConstants.ADD_CARDISSUER_SUCCESS,
        response: { data: [] }
      })
    ).toEqual({
      ...initialState,
      response: { data: [] },
      submitted: true
    });
  });

  it("should handle ADD_CARDISSUERS_ERROR", () => {
    expect(
      addCardIssuer(initialState, {
        type: cardIssuersConstants.ADD_CARDISSUER_FAILURE,
        error: { data: [] }
      })
    ).toEqual({
      ...initialState,
      error: { data: [] }
    });
  });
});
