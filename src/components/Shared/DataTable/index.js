import React from "react";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";

import TableComponent from "./Table";
import { message } from "../../../_constants";
import Paginator from "./Paginator";
import { TableHeader } from "./TableHeader";
import TableFilter from "./TableFilter";
import { createUrlParams, urlUtils, tableUtils } from "../../../_utils";

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
    const filterAndSortParams = urlUtils.handleQueryString(
      window.location.search
    );
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

  componentWillReceiveProps(nextProps) {
    const { count } = this.props;
    const { pageSize, numberOfPages, pageData, pageNumber } = this.state;
    const data = nextProps.data;
    let stateUpdate = null;
    if (count !== nextProps.count || !numberOfPages) {
      const numberOfPageState = tableUtils.getNumberOfPages(
        pageSize,
        nextProps.count
      );
      stateUpdate = { numberOfPages: numberOfPageState };
    }
    if (!pageData.length && data && data.data && data.data.length) {
      const page = tableUtils.createPageData(pageNumber, pageSize, data.data);
      stateUpdate = { ...stateUpdate, pageData: page };
    }
    if (stateUpdate) {
      this.setState({ ...stateUpdate, allData: data ? data.data : [] });
    }
  }

  updatePage = (pageNumber, pageSize, allData) => {
    const pageData = tableUtils.createPageData(pageNumber, pageSize, allData);
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
            numberOfPages: tableUtils.getNumberOfPages(
              Number(value),
              Number(this.state.allData.length)
            )
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

  handleSort = column => {
    const direction = this.state.sort.column
      ? this.state.sort.direction === "desc"
        ? "asc"
        : "desc"
      : "asc";
    const sortedData = tableUtils.sortData(
      this.state.allData,
      column,
      direction
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
        this.createQueryParams(
          createUrlParams({
            column: sort.column.accessor,
            direction: sort.direction
          }),
          "sort"
        );
      }
    );
  };

  createQueryParams = (queryString, type) => {
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
      () => {
        const { filterQueryString, sortQueryString } = this.state;
        tableUtils.implementQueryString(filterQueryString, sortQueryString);
      }
    );
  };

  handleFilter = data => {
    const allData = this.props.data ? this.props.data.data : [];
    let filteredData = tableUtils.filterData(allData, data);

    if (this.state.sort.column && this.state.sort.direction) {
      filteredData = tableUtils.sortData(
        filteredData,
        this.state.sort.column,
        this.state.sort.direction
      );
    }

    this.setState(
      previousState => {
        return {
          ...previousState,
          allData: filteredData,
          numberOfPages: tableUtils.getNumberOfPages(
            this.state.pageSize,
            filteredData.length
          )
        };
      },
      () => {
        const { pageNumber, pageSize, allData } = this.state;
        this.updatePage(pageNumber, pageSize, allData);
        this.createQueryParams(
          createUrlParams(tableUtils.cleanObject(data)),
          "filter"
        );
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
