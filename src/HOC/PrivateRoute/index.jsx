import React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      component={(props) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          return <Component props={props} />;
        } else {
          return <Redirect to="/auths/login" />;
        }
      }}
    />
  );
};

PrivateRoute.propTypes = {};

export default PrivateRoute;
