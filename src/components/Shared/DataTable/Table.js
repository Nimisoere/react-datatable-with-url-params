import React from "react";
import PropTypes from "prop-types";

import { Table } from "reactstrap";
import { MdSort } from "react-icons/md";
import { StyleSheet, css } from "aphrodite";

export default class TableComponent extends React.Component {
  sort = column => {
    if (column.sortable && this.props.data.length) {
      this.props.sort(column);
    }
  };

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
      responsive,
      sortState
    } = this.props;
    const tableColumns =
      columns &&
      columns.map((column, index) => (
        <th
          key={index}
          onClick={() => this.sort(column)}
          className={`${css(styles.tableHeader)} ${column.sortable &&
            css(styles.sortable)} ${sortState.column &&
            sortState.column.accessor === column.accessor &&
            css(styles.sorted)}`}
        >
          {column.name}
          {column.sortable && (
            <MdSort
              size={15}
              className={`${css(styles.tableHeaderIcon)} ${
                sortState.direction === "asc" &&
                sortState.column &&
                sortState.column.accessor === column.accessor
                  ? css(styles.rotate)
                  : ""
              }`}
            />
          )}
        </th>
      ));

    const tableRows =
      data &&
      data.map((row, index) => (
        <tr key={index}>
          {columns.map((column, index) => {
            const original = row;
            const cell = column.Cell
              ? column.Cell(original)
              : row[column.accessor];

            return <td key={index}>{cell}</td>;
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

const styles = StyleSheet.create({
  tableHeader: {
    position: "relative"
  },
  tableHeaderIcon: {
    position: "absolute",
    top: "3px",
    right: "3px"
  },
  sortable: {
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#EEE"
    }
  },
  sorted: {
    backgroundColor: "#EEE"
  },
  rotate: {
    transform: "rotate(180deg)"
  }
});

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
