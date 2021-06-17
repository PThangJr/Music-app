import React from "react";
import { Route, Switch } from "react-router-dom";
import Albums from "../../features/Albums";
import Auths from "../../features/Auths";
import { Categories } from "../../features/Categories";
import Favorites from "../../features/Favorites";
import Playlists from "../../features/Playlists";
import RankPage from "../../features/Rank/pages/RankPage";
import Singers from "../../features/Singers";
import Songs from "../../features/Songs";
import PrivateRoute from "../../HOC/PrivateRoute";
import AdminPage from "../../pages/AdminPage";
import HomePage from "../../pages/HomePages";
import "./styles.scss";
const Main = () => {
  return (
    <main className="main">
      <div className="container-md">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/playlists" component={Playlists} />
          <Route path="/songs" component={Songs} />
          <Route path="/albums" component={Albums} />
          <Route path="/singers" component={Singers} />
          <Route path="/rank" component={RankPage} />
          <Route path="/auths" component={Auths} />
          <Route path="/favorites" component={Favorites} />
          <Route path="/categories" component={Categories} />
          <PrivateRoute path="/admin" exact component={AdminPage} />
        </Switch>
      </div>
    </main>
  );
};

export default Main;
