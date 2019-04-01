import { apiCall } from "../../../_utils";
import { apiUrls } from "../../../_constants";

export const applicationsService = {
  getAllApplications
};

function getAllApplications() {
  return apiCall("GET", apiUrls.applications.base);
}

