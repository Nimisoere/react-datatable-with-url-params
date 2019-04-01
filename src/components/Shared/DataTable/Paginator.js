import React, { Component } from "react";
import {
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText
} from "reactstrap";
import { appConstants } from "../../../_constants/app.constants";

class Paginator extends Component {
  handlePageNumberChange = () => {
    return null;
  };

  handlePageSizeChange = () => {
    return null
  }

  render() {
    const { pageNumber, numberOfPages, recordsPerPage } = this.props;

    return (
      <Row className="paginator mb-3">
        <Col sm="3">
          <button
            className="btn btn-brand"
            disabled={pageNumber <= 1}
            onClick={this.handlePreviousClick}
          >
            Previous
          </button>
        </Col>
        <Col sm="6" className="text-center">
          <Row>
            <Col sm="6">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Page</InputGroupText>
                </InputGroupAddon>
                <Input
                  value={pageNumber}
                  onChange={this.handlePageNumberChange}
                  onBlur={this.handleKeyUp}
                  className="text-center"
                />
                <InputGroupAddon addonType="append">
                  <InputGroupText>of {numberOfPages}</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
            <Col sm="6">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Show</InputGroupText>
                </InputGroupAddon>
                <Input
                  value={recordsPerPage}
                  onChange={this.handlePageSizeChange}
                  type="select"
                  name="select"
                  id="rowcount"
                >
                  {appConstants.PAGE_SIZE_OPTIONS.map((option, index) => (
                    <option key={`option${index}`}>{option}</option>
                  ))}
                </Input>
                <InputGroupAddon addonType="append">
                  <InputGroupText>records</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>
        </Col>
        <Col sm="3" className="text-right">
          <button
            className="btn btn-brand"
            disabled={pageNumber >= numberOfPages}
            onClick={this.handleNextClick}
          >
            Next
          </button>
        </Col>
      </Row>
    );
  }
}

export default Paginator;
