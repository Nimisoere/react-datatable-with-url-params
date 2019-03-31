import React from "react";
import "./spinner.scss";

export const Spinner = ({ float, size, message, className }) => (
  <div className={className}>
    <div
      className={"loader " + float}
      style={{ width: size, height: size, verticalAlign: "middle" }}
    />
    {message && <span className="_primary-text ml-3">{message}</span>}
  </div>
);
