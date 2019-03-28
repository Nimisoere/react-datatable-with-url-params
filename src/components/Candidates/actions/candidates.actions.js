import { cardIssuersConstants } from "../constants/action.constants";
import { cardIssuerService } from "../services/candidates.service";
import { alertActions } from "../../Alert/actions/alert.actions";
import { message, routeConstants } from "../../../_constants";
import { history } from "../../../_utils";

export const cardIssuerActions = {
  addCardIssuer,
  getAllCardIssuers,
  getCardIssuer,
  resetCardIssuer,
  resetAddCardIssuer
};

function getAllCardIssuers() {
  return async dispatch => {
    dispatch(request());
    try {
      const response = await cardIssuerService.getAllCardIssuers();
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        alertActions.error(
          error ? error.message : message.GENERIC_ERROR,
          message.LOAD_CARD_ISSUERS
        )
      );
    }
  };

  function request() {
    return { type: cardIssuersConstants.GET_CARDISSUERS_REQUEST };
  }
  function success(response) {
    return { type: cardIssuersConstants.GET_CARDISSUERS_SUCCESS, response };
  }
  function failure(error) {
    return { type: cardIssuersConstants.GET_CARDISSUERS_FAILURE, error };
  }
}

function getCardIssuer(id) {
  return async dispatch => {
    dispatch(request(id));
    try {
      const response = await cardIssuerService.getCardIssuer(id);
      response && dispatch(success(response));
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        alertActions.error(
          error ? error.message : message.GENERIC_ERROR,
          `${message.GET_CARD_ISSUER}: ${id}`
        )
      );
    }
  };

  function request(id) {
    return { type: cardIssuersConstants.VIEW_CARDISSUER_REQUEST, id };
  }
  function success(response) {
    return { type: cardIssuersConstants.VIEW_CARDISSUER_SUCCESS, response };
  }
  function failure(error) {
    return { type: cardIssuersConstants.VIEW_CARDISSUER_FAILURE, error };
  }
}

function addCardIssuer(requestBody) {
  return async dispatch => {
    dispatch(request(requestBody));
    try {
      const response = await cardIssuerService.addCardIssuer(requestBody);
      response && dispatch(success(response));
      dispatch(getAllCardIssuers());
      if (requestBody.id) {
        history.push(routeConstants.CARDISSUERS.path);
      }
      dispatch(
        alertActions.success(
          response && response.responseMessage,
          requestBody.id ? message.EDIT_CARD_ISSUER : message.ADD_CARD_ISSUER
        )
      );
      dispatch(resetAddCardIssuer());
      dispatch(resetCardIssuer());
    } catch (error) {
      dispatch(failure(error));
      dispatch(
        alertActions.error(
          error ? error.message : message.GENERIC_ERROR,
          requestBody.id ? message.EDIT_CARD_ISSUER : message.ADD_CARD_ISSUER
        )
      );
    }
  };

  function request(requestBody) {
    return { type: cardIssuersConstants.ADD_CARDISSUER_REQUEST, requestBody };
  }
  function success(response) {
    return { type: cardIssuersConstants.ADD_CARDISSUER_SUCCESS, response };
  }
  function failure(error) {
    return { type: cardIssuersConstants.ADD_CARDISSUER_FAILURE, error };
  }
}

function resetCardIssuer() {
  return { type: cardIssuersConstants.VIEW_CARDISSUER_RESET };
}

function resetAddCardIssuer() {
  return { type: cardIssuersConstants.ADD_CARDISSUER_RESET };
}
