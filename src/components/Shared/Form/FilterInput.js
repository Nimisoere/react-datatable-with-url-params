import { withFormsy, propTypes } from "formsy-react";
import React from "react";
import { Input } from "reactstrap";
import { StyleSheet, css } from "aphrodite";

export class FilterInput extends React.Component {
  changeValue = event => {
    this.props.setValue(
      event.currentTarget[this.props.type === "checkbox" ? "checked" : "value"]
    );
  };

  render() {
    const {
      validating,
      disabled,
      options,
      getValue,
      name,
      onKeyUp,
      placeholder,
      type
    } = this.props;

    return (
      <span className={css(styles.input)}>
        {!!options ? (
          <select
            value={getValue() || ""}
            disabled={validating ? true : false || disabled}
            onChange={this.changeValue}
            name={name}
            id={name}
            className="form-control"
          >
            <option>Select an option</option>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <Input
            type={type || "text"}
            value={getValue() || ""}
            disabled={validating ? true : false || disabled}
            onChange={this.changeValue}
            name={name}
            placeholder={placeholder}
            id={name}
            onKeyUp={onKeyUp}
            autoComplete="on"
          />
        )}
      </span>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    position: "relative",
    flex: "1 1 auto",
    width: "1%",
    marginBottom: "0"
  }
});

FilterInput.propTypes = {
  ...propTypes
};

export default withFormsy(FilterInput);
