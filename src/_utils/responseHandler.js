import { message } from "../_constants";


const createUrlParams = params => {
  const esc = encodeURIComponent;
  const query = Object.keys(params)
    .map(k => esc(k) + "=" + esc(params[k]))
    .join("&");

  return query;
};

export const basicHeader = {
  "Content-Type": "application/json"
};

export const handleResponse = response => {
  if (response.ok && response.status === 200) {
    return response.json();
  } else if (response.ok && response.status === 201) {
    return response.text();
  }

  return response.json().then(json => {
    const error = new Error(
      json.message ||
        json.Message ||
        json.responseMessage ||
        json.error ||
        message.GENERIC_ERROR
    );
    return Promise.reject(Object.assign(error, { response }));
  });
};

export const apiCall = (requestType, url, requestBody, requestParams) => {
  let headers = { ...basicHeader };
  
  const requestOptions = {
    method: requestType,
    headers,
    body: requestBody ? JSON.stringify(requestBody) : undefined
  };
  if (requestParams) {
    const urlParams = createUrlParams(requestParams);
    url = `${url}?${urlParams}`;
  }
  return fetch(url, requestOptions).then(handleResponse);
};
