import React from "react";
import { Row, Col } from "reactstrap";
import { MdAutorenew } from "react-icons/md";
import PropTypes from "prop-types";

import { Spinner } from "../../Shared";
export const TableHeader = ({
  loading,
  countName,
  count,
  loadData,
  pageSize,
  pageNumber
}) => {
  const pageStart = (pageNumber || 1) * pageSize - (pageSize - 1);
  const pageEnd = Math.min(pageStart + pageSize - 1, count);
  return (
    <Row className="mb-3">
      <Col sm="6">
        <h5 className="item-count">
          {loading
            ? `Fetching ${countName || "Result(s)"}...`
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

TableHeader.propTypes = {
  loading: PropTypes.bool,
  countName: PropTypes.string,
  count: PropTypes.number,
  loadData: PropTypes.func,
  pageSize: PropTypes.number,
  pageNumber: PropTypes.number
};
