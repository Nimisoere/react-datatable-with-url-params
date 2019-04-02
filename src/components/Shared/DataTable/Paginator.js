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
  handlePageSizeChange = event => {
    const value = event.target.value;
    this.props.pageCountChange(Number(value));
  };

  handlePageNumberChange = event => {
    const value = event.target.value;
    this.props.pageNumberChange(value ? Number(value) : "");
  };

  render() {
    const {
      pageNumber,
      numberOfPages,
      recordsPerPage,
      next,
      prev
    } = this.props;

    return (
      <Row className="paginator mb-3">
        <Col sm="3">
          <button
            className="btn btn-brand"
            disabled={pageNumber <= 1}
            onClick={prev}
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
                  className="text-center"
                  type="number"
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
            onClick={next}
          >
            Next
          </button>
        </Col>
      </Row>
    );
  }
}

export default Paginator;
