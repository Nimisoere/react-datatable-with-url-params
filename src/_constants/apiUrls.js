const hostName = "http://personio-fe-test.herokuapp.com";
const apiVersion = "v1";
const apiName = "api";
const baseUrl = `${hostName}/${apiName}/${apiVersion}`;

export const apiUrls = {
  applications: {
    base: `${baseUrl}/candidates`
  }
};
