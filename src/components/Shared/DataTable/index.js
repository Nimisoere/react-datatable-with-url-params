import React from "react";
import { Row, Col, Alert } from "reactstrap";
import { MdAutorenew } from "react-icons/md";

import { Spinner } from "../../Shared";
import TableComponent from "./Table";
import { message } from "../../../_constants";
import Paginator from "./Paginator";

export default class DataTable extends React.Component {
  state = {
    allData: [],
    pageData: [],
    pageSize: 10,
    pageNumber: 1,
    numberOfPages: null,
    sort: {
      column: null,
      direction: "desc"
    }
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
            numberOfPages: Math.ceil(Number(this.props.count / value))
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
        const { pageNumber, pageSize, allData } = this.state;
        this.updatePage(pageNumber, pageSize, allData);
      }
    );
  };

  render() {
    const {
      columns,
      loading,
      countName,
      count,
      loadData,
      error,
      size,
      bordered,
      borderless,
      striped,
      dark,
      hover,
      defaultPageSize,
      responsive
    } = this.props;
    const {
      pageSize,
      pageNumber,
      numberOfPages,
      pageData,
      sort,
      allData
    } = this.state;
    const pageStart = pageSize * ((pageNumber || 1) - 1) + 1;
    const pageEnd = pageSize * (pageNumber || 1);
    return (
      <div>
        <Row className="mb-3">
          <Col sm="6">
            <h5 className="item-count">
              {loading
                ? `Fetching ${countName}...`
                : `Showing ${pageStart} to ${pageEnd} of ${count} ${countName ||
                    "Result(s)"}`}
            </h5>
          </Col>
          <Col sm="6">
            <div className="text-right">
              <button
                disabled={loading}
                onClick={loadData}
                className="btn btn-brand"
              >
                {loading ? (
                  <Spinner />
                ) : (
                  <span>
                    <MdAutorenew size={20} /> Refresh
                  </span>
                )}
              </button>
            </div>
          </Col>
        </Row>
        {error && allData ? (
          <Alert color="danger">{message.OUTDATED_DATA}</Alert>
        ) : null}
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
