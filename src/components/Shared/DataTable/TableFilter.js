import React, { Component } from "react";
import {
  Card,
  CardBody,
  InputGroup,
  InputGroupAddon,
  Button
} from "reactstrap";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Formsy from "formsy-react";
import { MdCancel } from "react-icons/md";
import FilterInput from "../Form/FilterInput";

class TableFilter extends Component {
  state = { filters: [] };

  addFilter = param => {
    console.log(this.state.filters.includes(param))
    if (!this.state.filters.includes(param)) {
      this.setState({
        filters: [...this.state.filters, param]
      });
    }
  };

  handleSubmit = data => {
    this.props.filterData(data);
  };

  render() {
    const { columns } = this.props;
    const { filters } = this.state;
    const fiterParams = columns.filter(column => column.filterable === true);

    return (
      <Card className="mb-3">
        <CardBody>
          {fiterParams && fiterParams.length ? (
            <UncontrolledDropdown>
              <DropdownToggle className="btn-sm" caret>
                Filter by
              </DropdownToggle>
              <DropdownMenu>
                {fiterParams.map((param, index) => (
                  <DropdownItem
                    onClick={() => this.addFilter(param)}
                    className="btn-sm"
                    key={index}
                  >
                    {param.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : null}

          <Formsy
            ref="filterForm"
            onValidSubmit={this.handleSubmit}
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            noValidate
          >
            {filters.map((filter, index) => (
              <InputGroup key={index} className="my-3">
                <InputGroupAddon addonType="prepend">
                  {filter.name}
                </InputGroupAddon>
                <FilterInput
                  type={!!filter.filterOptions && "select"}
                  options={filter.filterOptions}
                  name={filter.accessor}
                />
                <InputGroupAddon addonType="append">
                  <Button color="secondary">
                    <MdCancel />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            ))}
            {!!filters.length && (
              <div className="text-right">
                <button type="submit" className="btn btn-brand-2">
                  Apply
                </button>
              </div>
            )}
          </Formsy>
        </CardBody>
      </Card>
    );
  }
}

export default TableFilter;
