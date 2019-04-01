import React from "react";
import PropTypes from "prop-types";

import { Table } from "reactstrap";

export default class TableComponent extends React.Component {
  render() {
    const {
      columns,
      data,
      size,
      bordered,
      borderless,
      striped,
      dark,
      hover,
      responsive
    } = this.props;
    const tableColumns =
      columns &&
      columns.map((column, index) => <th key={index}>{column.name}</th>);

    const tableRows =
      data &&
      data.map((row, index) => (
        <tr key={index}>
          {columns.map((column, index) => {
            return <td key={index}>{row[column.accessor]}</td>;
          })}
        </tr>
      ));
    return (
      <Table
        dark={dark}
        hover={hover}
        bordered={bordered}
        borderless={borderless}
        striped={striped}
        responsive={responsive}
        size={size}
      >
        <thead>
          <tr>{tableColumns}</tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>
    );
  }
}

Table.propTypes = {
  // Pass in a Component to override default element
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  columns: PropTypes.array,
  data: PropTypes.array,
  size: PropTypes.string,
  bordered: PropTypes.bool,
  borderless: PropTypes.bool,
  striped: PropTypes.bool,
  dark: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.bool,
  // Custom ref handler that will be assigned to the "ref" of the inner <table> element
  innerRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
    PropTypes.object
  ])
};
