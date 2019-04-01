import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import { Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { ApplicationsList } from "./List";
import NotFound from "../NotFound";

import { PageHeader } from "../Shared";

import { applicationActions } from "./actions/applications.actions";

export class ManageApplications extends Component {
  componentDidMount() {
    this.getApplications();
  }

  getApplications = () => {
    this.props.getApplications();
  };

  render() {
    const { fetching, fetched, response, error, match } = this.props;

    return (
      <div className="applications" id="applications">
        <Row>
          <Col>
            <PageHeader pageId="applications" pageTitle="Manage Applications" />
          </Col>
        </Row>

        <div className="content-wrapper">
          <Switch>
            <Route
              exact
              path={match.url}
              render={() => (
                <ApplicationsList
                  match={match}
                  data={response}
                  loadData={this.getApplications}
                  fetching={fetching}
                  fetched={fetched}
                  error={error}
                />
              )}
            />
            <Route
              path={`${match.url}/list`}
              render={() => (
                <ApplicationsList
                  match={match}
                  data={response}
                  loadData={this.getApplications}
                  fetching={fetching}
                  fetched={fetched}
                  error={error}
                />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { fetching, fetched, response, error } = state.applications;
  return {
    fetching,
    fetched,
    response,
    error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getApplications: bindActionCreators(
      applicationActions.getAllApplications,
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageApplications);