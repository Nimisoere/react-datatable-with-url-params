import React from "react";
import { Row, Col, Alert } from "reactstrap";
import { MdAutorenew } from "react-icons/md";

import { Spinner } from "../../Shared";
import TableComponent from "./Table";
import { message } from "../../../_constants";
import Paginator from "./Paginator";

export default class DataTable extends React.Component {
  state = {
    resolvedData: [],
    pageSize: 10,
    pageNumber: 1
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
    const { resolvedData, pageSize, pageNumber } = this.state;
    return (
      <div>
        <Row className="mb-3">
          <Col sm="6">
            <h5 className="item-count">
              {loading
                ? `Fetching ${countName}...`
                : `${count} ${countName || "Result(s)"} Found`}
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
        {error && !data ? (
          <Alert color="danger">{message.OUTDATED_DATA}</Alert>
        ) : null}
        <TableComponent
          columns={columns}
          data={resolvedData}
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
        />
      </div>
    );
  }
}
