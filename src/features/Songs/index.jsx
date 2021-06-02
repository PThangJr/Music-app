import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import AllSongs from "./pages/AllSongs";
import SongDetail from "./pages/SongDetail";

const Songs = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}`} exact component={AllSongs} />
      <Route path={`${match.path}/:songSlug`} component={SongDetail} />
    </Switch>
  );
};

export default Songs;
