import { applicationConstants } from "../constants/action.constants";
import { applicationsService } from "../services/applications.service";
import { alertActions } from "../../Alert/actions/alert.actions";
import { message } from "../../../_constants";

export const applicationActions = {
  getAllApplications,
  resetApplications
};

function getAllApplications() {
  return async dispatch => {
    dispatch(request());
    try {
      const response = await applicationsService.getAllApplications();
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        alertActions.error(
          error ? error.message : message.GENERIC_ERROR,
          message.LOAD_APPLICATIONS
        )
      );
    }
  };

  function request() {
    return { type: applicationConstants.GET_APPLICATION_REQUEST };
  }
  function success(response) {
    return { type: applicationConstants.GET_APPLICATION_SUCCESS, response };
  }
  function failure(error) {
    return { type: applicationConstants.GET_APPLICATION_FAILURE, error };
  }
}

function resetApplications() {
  return { type: applicationConstants.GET_APPLICATION_RESET };
}
