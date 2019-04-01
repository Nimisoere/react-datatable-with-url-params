import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { appConstants } from "../../_constants";

export const Seo = ({ title, description, base }) => (
  <div>
    {base ? (
      <Helmet
        titleTemplate={`%s - ${title}`}
        defaultTitle={appConstants.appName}
      >
        <meta charSet="utf-8" />
        <title>
          {title} | {appConstants.appName}{" "}
        </title>
        <meta name="description" content={description} />
      </Helmet>
    ) : (
      <Helmet>
        <title>
          {title} | {appConstants.appName}{" "}
        </title>
        <meta name="description" content={description} />
      </Helmet>
    )}
  </div>
);

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  base: PropTypes.bool
};
