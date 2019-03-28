const hostName = "http://personio-fe-test.herokuapp.com";
const apiVersion = "v1";
const apiName = "api";
const baseUrl = `${hostName}/${apiName}/${apiVersion}`;

export const apiUrls = {
  candidates: {
    base: `${baseUrl}/candidates`
  }
};
