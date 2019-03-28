import { apiCall } from "../../../_utils";
import { apiUrls } from "../../../_constants";

export const cardIssuerService = {
  getAllCardIssuers,
  addCardIssuer,
  getCardIssuer
};

function getAllCardIssuers() {
  return apiCall("GET", apiUrls.issuers.base);
}

function addCardIssuer(request) {
  const method = request && request.id ? "PUT" : "POST";
  return apiCall(method, apiUrls.issuers.base, request);
}

function getCardIssuer(id) {
  return apiCall("GET", `${apiUrls.issuers.base}/${id}`);
}
