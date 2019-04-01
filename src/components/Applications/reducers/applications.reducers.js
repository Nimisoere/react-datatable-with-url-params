import { applicantConstants } from "../constants/action.constants";

const initialState = {
  fetching: false,
  fetched: false,
  response: null,
  error: null
};

export const applicants = (state = initialState, action) => {
  switch (action.type) {
    case applicantConstants.GET_APPLICATION_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case applicantConstants.GET_APPLICATION_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        response: action.response,
        error: null
      };
    case applicantConstants.GET_APPLICATION_FAILURE:
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.error
      };
    case applicantConstants.GET_APPLICATION_RESET:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
