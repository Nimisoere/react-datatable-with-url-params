import React from "react";
import { Row, Col, Alert } from "reactstrap";
import { MdAutorenew } from "react-icons/md";

import { Spinner } from "../../Shared";
import TableComponent from "./Table";
import { message } from "../../../_constants";

export default class DataTable extends React.Component {
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
      responsive
    } = this.props;
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
        {error && <Alert color="danger">{message.OUTDATED_DATA}</Alert>}
        <TableComponent
          columns={columns}
          data={data ? data.data : []}
          dark={dark}
          hover={hover}
          bordered={bordered}
          borderless={borderless}
          striped={striped}
          responsive={responsive}
          size={size}
        />
      </div>
    );
  }
}
