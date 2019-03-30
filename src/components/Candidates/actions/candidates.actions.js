import { candidateConstants } from "../constants/action.constants";
import { candidatesService } from "../services/candidates.service";
import { alertActions } from "../../Alert/actions/alert.actions";
import { message } from "../../../_constants";

export const candidateActions = {
  getAllCandidates,
  resetCandidates
};

function getAllCandidates() {
  return async dispatch => {
    dispatch(request());
    try {
      const response = await candidatesService.getAllCandidates();
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        alertActions.error(
          error ? error.message : message.GENERIC_ERROR,
          message.LOAD_CANDIDATES
        )
      );
    }
  };

  function request() {
    return { type: candidateConstants.GET_CANDIDATE_REQUEST };
  }
  function success(response) {
    return { type: candidateConstants.GET_CANDIDATE_SUCCESS, response };
  }
  function failure(error) {
    return { type: candidateConstants.GET_CANDIDATE_FAILURE, error };
  }
}

function resetCandidates() {
  return { type: candidateConstants.GET_CANDIDATE_RESET };
}
