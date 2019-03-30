import { candidateConstants } from "../constants/action.constants";

const initialState = {
  fetching: false,
  fetched: false,
  response: null,
  error: null
};

export const candidates = (state = initialState, action) => {
  switch (action.type) {
    case candidateConstants.GET_CANDIDATE_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case candidateConstants.GET_CANDIDATE_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        response: action.response,
        error: null
      };
    case candidateConstants.GET_CANDIDATE_FAILURE:
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.error
      };
    case candidateConstants.GET_CANDIDATE_RESET:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
