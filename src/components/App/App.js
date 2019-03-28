import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "../../_utils";
import { appConstants } from "../../_constants";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Container } from "reactstrap";
import "./App.scss";

import { CustomNavBar } from "../CustomNavBar/NavBar";

import { alertActions } from "../Alert/actions/alert.actions";

export class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <main className="main-content">
            <CustomNavBar appName={appConstants.appName} />
            <Container>
              <Switch>
                <Route
                  key="1"
                  exact={true}
                  path="/"
                  name="Home"
                  component={() => null}
                />
              </Switch>
            </Container>
          </main>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  const { type, message, section } = state.alert;

  return {
    type,
    section,
    message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearAlerts: bindActionCreators(alertActions.clear, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
