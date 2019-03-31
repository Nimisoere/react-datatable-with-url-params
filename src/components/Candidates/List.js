import React from "react";
import { Row, Col, Button, Alert } from "reactstrap";
import { MdAutorenew } from "react-icons/md";

import PropTypes from "prop-types";

import { Spinner } from "../Shared";
import { message } from "../../_constants";
import DataTable from "../Shared/DataTable";

export const CandidatesList = ({ ...props }) => {
  const { fetching, data, loadData, error } = props;

  return (
    <div>
      <Row>
        <Col sm="6">
          <h5 className="item-count">{data && data.count} Result(s) Found</h5>
        </Col>
        <Col sm="6">
          <div className="text-right">
            <Button
              disabled={fetching}
              onClick={loadData}
              className="btn btn-primary btn-outline"
            >
              {fetching ? (
                <Spinner />
              ) : (
                <span>
                  <MdAutorenew size={20} /> Refresh
                </span>
              )}
            </Button>
          </div>
        </Col>
      </Row>
      <hr />
      {error && <Alert color="danger">{message.OUTDATED_DATA}</Alert>}
      <DataTable />
    </div>
  );
};

CandidatesList.propTypes = {
  match: PropTypes.object.isRequired,
  data: PropTypes.object,
  loadData: PropTypes.func,
  fetching: PropTypes.bool,
  fetched: PropTypes.bool,
  error: PropTypes.object
};

export default CandidatesList;
