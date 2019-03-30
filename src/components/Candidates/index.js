import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import { Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import CardIssuersList from "./List";
import NotFound from "../NotFound";

import { PageHeader } from "../Shared";

import { candidateActions } from "./actions/candidates.actions";

export class ManageCardIssuers extends Component {
  componentDidMount() {
    this.getCandidates();
  }

  getCandidates = () => {
    this.props.getCardIssuers();
  };

  render() {
    const { fetching, fetched, response, error, match } = this.props;

    return (
      <div className="candidates" id="candidates">
        <Row>
          <Col>
            <PageHeader pageId="cardissuers" pageTitle="Manage Candidates" />
          </Col>
        </Row>

        <div className="content-wrapper">
          <Switch>
            <Route
              exact
              path={match.url}
              render={() => (
                <CardIssuersList
                  match={match}
                  data={response}
                  loadData={this.getCandidates}
                  fetching={fetching}
                  fetched={fetched}
                  error={error}
                />
              )}
            />
            <Route
              path={`${match.url}/list`}
              render={() => (
                <CardIssuersList
                  match={match}
                  data={response}
                  loadData={this.getCandidates}
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
  const { fetching, fetched, response, error } = state.cardIssuers;
  return {
    fetching,
    fetched,
    response,
    error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCardIssuers: bindActionCreators(
      candidateActions.getAllCardIssuers,
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCardIssuers);
