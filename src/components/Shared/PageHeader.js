import React from "react";
import { Container } from "reactstrap";
import { Seo } from "../Shared";
import PropTypes from "prop-types";

import { seoObject } from "../../_constants";
import "./PageHeader.scss";

export const PageHeader = ({ pageId, pageTitle, isBase }) => (
  <div className="page-header">
    <Container>
      <Seo
        title={
          seoObject[pageId]
            ? seoObject[pageId].title || seoObject.base.title
            : seoObject.base.title
        }
        description={
          seoObject[pageId]
            ? seoObject[pageId].description || seoObject.base.description
            : seoObject.base.description
        }
        base={isBase}
      />
      <h4>{pageTitle}</h4>
    </Container>
  </div>
);

PageHeader.propTypes = {
  pageId: PropTypes.string,
  pageTitle: PropTypes.string,
  isBase: PropTypes.bool
};
