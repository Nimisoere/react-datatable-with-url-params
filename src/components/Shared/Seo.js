import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

export const Seo = ({ title, description, base }) => (
  <div>
    {base ? (
      <Helmet titleTemplate={`%s - ${title}`} defaultTitle="NIMC Wallet Management">
        <meta charSet="utf-8" />
        <title>{title} | NIMC Wallet Management </title>
        <meta name="description" content={description} />
      </Helmet>
    ) : (
      <Helmet>
        <title>{title} | NIMC Wallet Management </title>
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
