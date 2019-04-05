import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";

import { history } from "../../_utils";
import { appConstants } from "../../_constants";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./App.scss";

import { CustomNavBar } from "../CustomNavBar/NavBar";

import { alertActions } from "../Alert/actions/alert.actions";

import { routes } from "../../_constants";

export class App extends Component {
  notify = () => {
    const { type, message, section } = this.props;
    toast[type || "info"](
      <div>
        <p>
          <span className="font-weight-bold">{section}:</span>
          <br /> {message}
        </p>
      </div>
    );
    this.props.clearAlerts();
  };
  
  render() {
    const { message } = this.props;
    if (message) {
      this.notify();
    }
    return (
      <Router history={history}>
        <div className="App">
          <ToastContainer hideProgressBar autoClose={2000} />
          <main className="main-content">
            <CustomNavBar appName={appConstants.appName} />
            <div>
              <Switch>
                {routes.map(route => (
                  <Route
                    key={route.key}
                    exact={route.exact}
                    path={route.path}
                    name={route.name}
                    component={route.pageComponent}
                  />
                ))}
              </Switch>
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  type: PropTypes.string,
  section: PropTypes.string,
  message: PropTypes.string,
  clearAlerts: PropTypes.func
};

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
