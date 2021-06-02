import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import AllSingers from "./pages/AllSingers";
import SingerDetail from "./pages/SingerDetail";

const Singers = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}`} exact component={AllSingers} />
      <Route path={`${match.path}/:singerSlug`} component={SingerDetail} />
    </Switch>
  );
};

export default Singers;
