import { applicationConstants } from "../constants/action.constants";

const initialState = {
  fetching: false,
  fetched: false,
  response: null,
  error: null
};

export const applications = (state = initialState, action) => {
  switch (action.type) {
    case applicationConstants.GET_APPLICATION_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case applicationConstants.GET_APPLICATION_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        response: action.response,
        error: null
      };
    case applicationConstants.GET_APPLICATION_FAILURE:
      return {
        ...state,
        fetching: false,
        fetched: false,
        error: action.error
      };
    case applicationConstants.GET_APPLICATION_RESET:
      return {
        ...state,
        ...initialState
      };
    default:
      return state;
  }
};
