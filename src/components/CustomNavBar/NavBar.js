import React from "react";
import { Navbar, NavbarBrand, Container } from "reactstrap";
import PropTypes from "prop-types";
import { StyleSheet, css } from "aphrodite";

export const CustomNavBar = ({ ...props }) => (
  <Navbar className={`${css(styles.navBar)} shadow-sm`} light expand="md">
    <Container>
      <NavbarBrand className="pointer font-weight-bold">
        {props.appName}
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

Navbar.propTypes = {
  light: PropTypes.bool,
  dark: PropTypes.bool,
  fixed: PropTypes.string,
  color: PropTypes.string,
  role: PropTypes.string,
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  // pass in custom element to use
};

NavbarBrand.propTypes = {
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
  // pass in custom element to use
};
