import React from "react";

import { PageHeader } from "../Shared";

import { Row, Col } from "reactstrap";

export const NotFound = () => (
  <div className="NotFound">
    <Row>
      <Col>
        <PageHeader pageId="notfound" pageTitle="Page not found" />
      </Col>
    </Row>
    <div className="content-wrapper">
      <Row className="text-center p-4">
        <Col>
          <h1 className="font-weight-bold">404</h1>
          <p>Page not found</p>
        </Col>
      </Row>
    </div>
  </div>
);

export default NotFound;
