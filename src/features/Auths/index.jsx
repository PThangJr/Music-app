import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import Login from "./components/Login";
import Register from "./components/Register";
import "./styles.scss";
const Auths = () => {
  const match = useRouteMatch();
  console.log(match);

  return (
    <div className="auths">
      <Switch>
        <Route path={`${match.path}/login`} component={Login} />
        <Route path={`${match.path}/register`} component={Register} />
      </Switch>
    </div>
  );
};

export default Auths;
