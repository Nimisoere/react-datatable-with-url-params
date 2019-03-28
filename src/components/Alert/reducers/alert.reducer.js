import { alertConstants } from "../constants/alert.constants";

export const alert = (state = {}, action) => {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: "success",
        section: action.section,
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: "error",
        section: action.section,
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state;
  }
};
