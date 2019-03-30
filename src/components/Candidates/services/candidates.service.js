import { apiCall } from "../../../_utils";
import { apiUrls } from "../../../_constants";

export const candidatesService = {
  getAllCandidates
};

function getAllCandidates() {
  return apiCall("GET", apiUrls.candidates.base);
}

