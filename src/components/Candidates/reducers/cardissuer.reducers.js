import { cardIssuersConstants } from "../constants/action.constants";

const initialState = {
  fetching: false,
  fetched: false,
  response: null,
  error: null
};

export const cardIssuers = (state = initialState, action) => {
  switch (action.type) {
    case cardIssuersConstants.GET_CARDISSUERS_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case cardIssuersConstants.GET_CARDISSUERS_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        response: action.response,
        error: null
      };
    case cardIssuersConstants.GET_CARDISSUERS_FAILURE:
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.error
      };
    case cardIssuersConstants.GET_CARDISSUERS_RESET:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
