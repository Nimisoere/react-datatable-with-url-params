const queryStringToObject = queryString => {
  return JSON.parse(
    '{"' +
      decodeURI(queryString)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
};

const handleQueryString = queryString => {
  let queryObjects = {};
  if (queryString) {
    const splitStrings = queryString.split("&&");
    if (splitStrings.length) {
      splitStrings.forEach(strings => {
        const stringSplit = strings.split(":");
        const queryObject = queryStringToObject(stringSplit[1]);
        queryObjects[
          stringSplit[0].includes("?")
            ? stringSplit[0].substring(1)
            : stringSplit[0]
        ] = queryObject;
      });
    }
  }
  return queryObjects;
};

export const urlUtils = {
  handleQueryString
};
