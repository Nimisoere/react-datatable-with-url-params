import React from "react";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";

import TableComponent from "./Table";
import { message } from "../../../_constants";
import Paginator from "./Paginator";
import { TableHeader } from "./TableHeader";
import TableFilter from "./TableFilter";
import { createUrlParams } from "../../../_utils";

export default class DataTable extends React.Component {
  state = {
    allData: [],
    pageData: [],
    pageSize: 10,
    pageNumber: 1,
    numberOfPages: null,
    filterState: null,
    sort: {
      column: null,
      direction: "desc"
    },
    filterQueryString: "",
    sortQueryString: ""
  };

  componentDidMount() {
    const filterAndSortParams = this.handleQueryString(window.location.search);
    let stateUpdate = {};
    if (filterAndSortParams && filterAndSortParams.filter) {
      stateUpdate = {
        ...stateUpdate,
        filterState: filterAndSortParams.filter
      };
    }
    if (filterAndSortParams && filterAndSortParams.sort) {
      const columnObject = this.props.columns.find(
        column => column.accessor === filterAndSortParams.sort.column
      );
      const sortObject = {
        column: columnObject,
        direction: filterAndSortParams.sort.direction
      };
      stateUpdate = {
        ...stateUpdate,
        sort: sortObject
      };
    }
    this.setState(
      {
        ...stateUpdate
      },
      () => this.applyFilterAndSortFromParams(this.state)
    );
  }

  applyFilterAndSortFromParams = stateObject => {
    if (stateObject.filterState) {
      this.handleFilter(stateObject.filterState);
    }
    if (stateObject.sort.column) {
      this.handleSort(stateObject.sort.column);
    }
  };

  handleQueryString = queryString => {
    let queryObjects = {};
    if (queryString) {
      const splitStrings = queryString.split("&&");
      if (splitStrings.length) {
        splitStrings.forEach(strings => {
          const stringSplit = strings.split(":");
          const queryObject = this.queryStringToObject(stringSplit[1]);
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

  queryStringToObject = queryString => {
    return JSON.parse(
      '{"' +
        decodeURI(queryString)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"') +
        '"}'
    );
  };

  getNumberOfPages = (pageSize, count) => {
    return Math.ceil(Number(count) / Number(pageSize));
  };

  componentWillReceiveProps(nextProps) {
    const { count } = this.props;
    const { pageSize, numberOfPages, pageData, pageNumber } = this.state;
    const data = nextProps.data;
    let stateUpdate = null;
    if (count !== nextProps.count || !numberOfPages) {
      const numberOfPageState = this.getNumberOfPages(
        pageSize,
        nextProps.count
      );
      stateUpdate = { numberOfPages: numberOfPageState };
    }
    if (!pageData.length && data && data.data && data.data.length) {
      const page = this.createPageData(pageNumber, pageSize, data.data);
      stateUpdate = { ...stateUpdate, pageData: page };
    }
    if (stateUpdate) {
      this.setState({ ...stateUpdate, allData: data ? data.data : [] });
    }
  }

  createPageData = (currentPage, pageSize, allData) => {
    const offset = ((currentPage || 1) - 1) * pageSize;
    const pageData = allData.slice(offset, offset + pageSize);
    return pageData;
  };

  updatePage = (pageNumber, pageSize, allData) => {
    const pageData = this.createPageData(pageNumber, pageSize, allData);
    this.setState({ pageData });
  };

  handlePreviousClick = () => {
    this.setState(
      previousState => {
        if (previousState.pageNumber > 1) {
          return {
            ...previousState,
            pageNumber: previousState.pageNumber - 1
          };
        }
      },
      () => {
        const { pageNumber, pageSize, allData } = this.state;
        this.updatePage(pageNumber, pageSize, allData);
      }
    );
  };

  handleNextClick = () => {
    this.setState(
      previousState => {
        if (previousState.pageNumber < this.state.numberOfPages) {
          return {
            ...previousState,
            pageNumber: previousState.pageNumber + 1
          };
        }
      },
      () => {
        const { pageNumber, pageSize, allData } = this.state;
        this.updatePage(pageNumber, pageSize, allData);
      }
    );
  };

  handlePageSizeChange = value => {
    this.setState(
      previousState => {
        if (previousState.pageSize !== value) {
          return {
            ...previousState,
            pageNumber: 1,
            pageSize: value,
            numberOfPages: Math.ceil(Number(this.state.allData.length / value))
          };
        }
      },
      () => {
        const { pageNumber, pageSize, allData } = this.state;
        this.updatePage(pageNumber, pageSize, allData);
      }
    );
  };

  handlePageNumberChange = value => {
    if (!value) {
      this.setState(
        previousState => {
          return {
            ...previousState,
            pageNumber: value
          };
        },
        () => {
          const { pageNumber, pageSize, allData } = this.state;
          this.updatePage(pageNumber, pageSize, allData);
        }
      );
    } else if (value >= 1 && value <= this.state.numberOfPages) {
      this.setState(
        previousState => {
          return {
            ...previousState,
            pageNumber: Number(value)
          };
        },
        () => {
          const { pageNumber, pageSize, allData } = this.state;
          this.updatePage(pageNumber, pageSize, allData);
        }
      );
    }
  };

  compareValues = (column, order) => {
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

  handleSort = column => {
    const direction = this.state.sort.column
      ? this.state.sort.direction === "desc"
        ? "asc"
        : "desc"
      : "asc";
    const sortedData = this.state.allData.sort(
      this.compareValues(column, direction)
    );
    this.setState(
      previousState => {
        return {
          ...previousState,
          allData: sortedData,
          sort: {
            column,
            direction
          }
        };
      },
      () => {
        const { pageNumber, pageSize, allData, sort } = this.state;
        this.updatePage(pageNumber, pageSize, allData);
        this.appendSearchParams(
          createUrlParams({
            column: sort.column.accessor,
            direction: sort.direction
          }),
          "sort"
        );
      }
    );
  };

  cleanObject = obj => {
    Object.keys(obj).forEach(key => !obj[key] && delete obj[key]);
    return obj;
  };

  createQueryString = () => {
    const { filterQueryString, sortQueryString } = this.state;
    const queryString = `${sortQueryString || filterQueryString ? "?" : ""}${
      sortQueryString ? sortQueryString : ""
    }${sortQueryString && filterQueryString ? "&&" : ""}${
      filterQueryString ? filterQueryString : ""
    }`;

    const newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      queryString;
    window.history.replaceState({ path: newurl }, "", newurl);
  };

  appendSearchParams = (queryString, type) => {
    let stateUpdate;

    if (type === "filter") {
      stateUpdate = {
        filterQueryString: queryString ? `filter:${queryString}` : ""
      };
    } else if (type === "sort") {
      stateUpdate = {
        sortQueryString: queryString ? `sort:${queryString}` : ""
      };
    }

    this.setState(
      {
        ...stateUpdate
      },
      () => this.createQueryString()
    );
  };

  handleFilter = data => {
    const filterObject = this.cleanObject(data);
    const filterKeys = Object.keys(filterObject);
    const allData = this.props.data ? this.props.data.data : [];
    let filteredData = allData.filter(row => {
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

    if (this.state.sort.column && this.state.sort.direction) {
      filteredData = filteredData.sort(
        this.compareValues(this.state.sort.column, this.state.sort.direction)
      );
    }

    this.setState(
      previousState => {
        return {
          ...previousState,
          allData: filteredData,
          numberOfPages: this.getNumberOfPages(
            this.state.pageSize,
            filteredData.length
          )
        };
      },
      () => {
        const { pageNumber, pageSize, allData } = this.state;
        this.updatePage(pageNumber, pageSize, allData);
        this.appendSearchParams(createUrlParams(filterObject), "filter");
      }
    );
  };

  setFilterState = data => {
    this.setState({
      filterState: data
    });
  };

  render() {
    const {
      columns,
      error,
      size,
      bordered,
      borderless,
      striped,
      dark,
      hover,
      defaultPageSize,
      responsive,
      loading,
      countName,
      loadData
    } = this.props;
    const {
      pageSize,
      pageNumber,
      numberOfPages,
      pageData,
      sort,
      filterState,
      allData
    } = this.state;

    const count = allData.length;
    return (
      <div>
        <TableHeader
          pageSize={pageSize}
          pageNumber={pageNumber}
          loading={loading}
          countName={countName}
          count={count}
          loadData={loadData}
        />
        {error && allData && allData.length ? (
          <Alert color="danger">{message.OUTDATED_DATA}</Alert>
        ) : null}

        <TableFilter
          loading={loading}
          filterData={this.handleFilter}
          columns={columns}
          filterState={filterState}
          setFilterState={this.setFilterState}
        />

        <TableComponent
          columns={columns}
          data={pageData}
          dark={dark}
          hover={hover}
          bordered={bordered}
          borderless={borderless}
          striped={striped}
          responsive={responsive}
          size={size}
          loading={loading}
          sort={this.handleSort}
          sortState={sort}
        />
        <Paginator
          recordsPerPage={pageSize || defaultPageSize}
          pageNumber={pageNumber}
          numberOfPages={numberOfPages}
          next={this.handleNextClick}
          pageCountChange={this.handlePageSizeChange}
          pageNumberChange={this.handlePageNumberChange}
          prev={this.handlePreviousClick}
        />
      </div>
    );
  }
}

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  data: PropTypes.object,
  count: PropTypes.number,
  countName: PropTypes.string,
  defaultPageSize: PropTypes.number,
  error: PropTypes.object,
  bordered: PropTypes.bool,
  striped: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.bool
};
