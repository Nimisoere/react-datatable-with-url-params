import React from "react";
import { Navbar, NavbarBrand, Container } from "reactstrap";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";
import logo from "../../_assets/personio_logo.svg";
export const CustomNavBar = ({ ...props }) => (
  <Navbar className={`${css(styles.navBar)} shadow-sm`} light expand="md">
    <Container>
      <NavbarBrand className="pointer font-weight-bold">
        <img src={logo} alt={props.appName} height="36" />
      </NavbarBrand>
    </Container>
  </Navbar>
);

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: "#FFFFFF",
    zIndex: 1
  }
});

CustomNavBar.propTypes = {
  appName: PropTypes.string
};

Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

NavbarBrand.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};
