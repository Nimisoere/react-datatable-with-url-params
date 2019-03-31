import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import { Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { CandidatesList } from "./List";
import NotFound from "../NotFound";

import { PageHeader } from "../Shared";

import { candidateActions } from "./actions/candidates.actions";

export class ManageCandidates extends Component {
  componentDidMount() {
    this.getCandidates();
  }

  getCandidates = () => {
    this.props.getCandidates();
  };

  render() {
    const { fetching, fetched, response, error, match } = this.props;

    return (
      <div className="candidates" id="candidates">
        <Row>
          <Col>
            <PageHeader pageId="candidates" pageTitle="Manage Candidates" />
          </Col>
        </Row>

        <div className="content-wrapper">
          <Switch>
            <Route
              exact
              path={match.url}
              render={() => (
                <CandidatesList
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
                <CandidatesList
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
  const { fetching, fetched, response, error } = state.candidates;
  return {
    fetching,
    fetched,
    response,
    error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCandidates: bindActionCreators(
      candidateActions.getAllCandidates,
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCandidates);
