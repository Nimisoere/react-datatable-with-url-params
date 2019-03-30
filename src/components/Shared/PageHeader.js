import React from "react";
import { Seo } from "../Shared";
import { seoObject } from "../../_constants";
import "./PageHeader.scss";

export const PageHeader = ({ pageId, pageTitle, isBase }) => (
  <div className="page-header">
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
  </div>
);