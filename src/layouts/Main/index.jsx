import React from "react";
import { Route, Switch } from "react-router-dom";
import Albums from "../../features/Albums";
import PlaylistsPage from "../../features/Playlists/pages/PlaylistsPage";
import Singers from "../../features/Singers";
import HomePage from "../../pages/HomePages";
import Details from "../Details";
import "./styles.scss";
const Main = () => {
  return (
    <main className="main">
      <div className="container-md">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/playlists/:playlistSlug" component={Details} />
          <Route path="/albums/:albumSlug" component={Albums} />
          <Route path="/singers/:singerSlug" component={Singers} />
        </Switch>
      </div>
    </main>
  );
};

export default Main;
