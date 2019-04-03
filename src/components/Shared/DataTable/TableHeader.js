import React from "react";
import { Row, Col } from "reactstrap";
import { MdAutorenew } from "react-icons/md";

import { Spinner } from "../../Shared";
export const TableHeader = ({ ...props }) => {
  const {
    loading,
    countName,
    count,
    loadData,
    pageSize,
    pageNumber
  } = props;
  const pageStart = (pageNumber || 1) * pageSize - (pageSize - 1);
  const pageEnd = Math.min(pageStart + pageSize - 1, count);
  return (
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
  );
};
