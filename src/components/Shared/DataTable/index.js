import React from "react";
import { Row, Col, Alert } from "reactstrap";
import { MdAutorenew } from "react-icons/md";

import { Spinner } from "../../Shared";
import TableComponent from "./Table";
import { message } from "../../../_constants";
import Paginator from "./Paginator";

export default class DataTable extends React.Component {
  state = {
    pageData: [],
    pageSize: 10,
    pageNumber: 1,
    numberOfPages: null
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
      this.setState(stateUpdate);
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
        const { pageNumber, pageSize } = this.state;
        const { data } = this.props;
        this.updatePage(pageNumber, pageSize, data.data);
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
        const { pageNumber, pageSize } = this.state;
        const { data } = this.props;
        this.updatePage(pageNumber, pageSize, data.data);
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
        const { pageNumber, pageSize } = this.state;
        const { data } = this.props;
        this.updatePage(pageNumber, pageSize, data.data);
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
          const { pageNumber, pageSize } = this.state;
          const { data } = this.props;
          this.updatePage(pageNumber, pageSize, data.data);
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
          const { pageNumber, pageSize } = this.state;
          const { data } = this.props;
          this.updatePage(pageNumber, pageSize, data.data);
        }
      );
    }
  };

  render() {
    const {
      columns,
      loading,
      countName,
      data,
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
    const { pageSize, pageNumber, numberOfPages, pageData } = this.state;
    const pageStart = pageSize * (pageNumber - 1) + 1;
    const pageEnd = pageSize * pageNumber;
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
        {error && data ? (
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
