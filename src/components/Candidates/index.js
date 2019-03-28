import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import { Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import CardIssuersList from "./List";
import CardIssuerForm from "./Form";
import CardIssuer from "./View";
import NotFound from "../NotFound";

import { PageHeader } from "../Shared";

import { cardIssuerActions } from "./actions/cardissuers.actions";

export class ManageCardIssuers extends Component {
  componentDidMount() {
    this.getCardIssuers();
  }

  getCardIssuers = () => {
    this.props.getCardIssuers();
  };

  render() {
    const { fetching, fetched, response, error, match } = this.props;

    return (
      <div className="CardIssuers">
        <Row>
          <Col>
            <PageHeader pageId="cardissuers" pageTitle="Manage Card Issuers" />
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
                  loadData={this.getCardIssuers}
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
                  loadData={this.getCardIssuers}
                  fetching={fetching}
                  fetched={fetched}
                  error={error}
                />
              )}
            />
            <Route path={`${match.url}/add`} component={CardIssuerForm} />
            <Route path={`${match.url}/view/:id`} component={CardIssuer} />
            <Route path={`${match.url}/edit/:id`} component={CardIssuerForm} />
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
      cardIssuerActions.getAllCardIssuers,
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCardIssuers);
