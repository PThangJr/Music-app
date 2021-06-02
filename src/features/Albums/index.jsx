import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import AlbumDetail from "./pages/AlbumDetail";
import AllAlbums from "./pages/AllAlbums";

const Albums = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}`} exact component={AllAlbums} />
      <Route path={`${match.path}/:albumSlug`} component={AlbumDetail} />
    </Switch>
  );
};

export default Albums;
