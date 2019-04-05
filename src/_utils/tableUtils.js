const getNumberOfPages = (pageSize, count) => {
  return Math.ceil(Number(count) / Number(pageSize));
};

const createPageData = (currentPage, pageSize, allData) => {
  const offset = ((currentPage || 1) - 1) * pageSize;
  const pageData = allData.slice(offset, offset + pageSize);
  return pageData;
};

const compareValues = (column, order) => {
  const key = column.accessor;
  return (a, b) => {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    let varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    let varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    if (column.sortType === "date") {
      varA = new Date(a[key]);
      varB = new Date(b[key]);
    }

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
};

const cleanObject = obj => {
  Object.keys(obj).forEach(key => !obj[key] && delete obj[key]);
  return obj;
};

const appendQueryString = queryString => {
  const newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    queryString;
  window.history.replaceState({ path: newurl }, "", newurl);
};

const implementQueryString = (filterQueryString, sortQueryString) => {
  const queryString = `${sortQueryString || filterQueryString ? "?" : ""}${
    sortQueryString ? sortQueryString : ""
  }${sortQueryString && filterQueryString ? "&&" : ""}${
    filterQueryString ? filterQueryString : ""
  }`;

  appendQueryString(queryString);
};

const sortData = (allData, column, direction) => {
  const data = allData.sort(compareValues(column, direction));
  return data;
};

const filterData = (allData, filterData) => {
  const filterObject = cleanObject(filterData);
  const filterKeys = Object.keys(filterObject);

  const filteredData = allData.filter(row => {
    return filterKeys.every(eachKey => {
      if (!filterObject[eachKey].length) {
        return true;
      }

      return row[eachKey]
        .toString()
        .toLowerCase()
        .includes(filterObject[eachKey].toString().toLowerCase());
    });
  });

  return filteredData;
};

export const tableUtils = {
  getNumberOfPages,
  createPageData,
  compareValues,
  cleanObject,
  implementQueryString,
  sortData,
  filterData
};
