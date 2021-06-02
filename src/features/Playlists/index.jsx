import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import AllPlaylists from "./pages/AllPlaylists";
import PlaylistDetail from "./pages/PlaylistDetail";

const Playlists = () => {
  const match = useRouteMatch();
  console.log(match);

  return (
    <Switch>
      <Route path={`${match.path}`} exact component={AllPlaylists} />
      <Route path={`${match.path}/:playlistSlug`} component={PlaylistDetail} />
    </Switch>
  );
};

export default Playlists;
