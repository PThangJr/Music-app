import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import Playlists from "../../features/Playlists";
import { fetchSongsOfRanking } from "../../features/Rank/songsOfRankingSlice";
import HomePages from "../HomePages";
import { fetchAnthologyAlbums } from "../HomePages/anthologyAlbumsSlice";
import { fetchBalladUsUkAlbums } from "../HomePages/balladUsUkAlbumSlice";
import { fetchPlaylists } from "../HomePages/playlistsSlice";

const AdminPage = () => {
  const dispatch = useDispatch();
  const anthologyAlbums = useSelector((state) => state.anthologyAlbums);
  const balladUsUkAlbums = useSelector((state) => state.balladUsUkAlbums);
  const songsOfRanking = useSelector((state) => state.songsOfRanking);
  const playlists = useSelector((state) => state.playlists);
  useEffect(() => {
    dispatch(fetchPlaylists());
  }, [dispatch]);
  useEffect(() => {
    if (playlists.data.length) {
      dispatch(
        fetchAnthologyAlbums({
          playlistSlug: playlists.data[0]?.slug,
          params: {
            limit: 6,
            page: 1,
          },
        })
      );
      dispatch(
        fetchBalladUsUkAlbums({
          playlistSlug: playlists.data[1]?.slug,
          params: {
            limit: 6,
            page: 1,
          },
        })
      );
    }
    dispatch(fetchSongsOfRanking({ params: { limit: 10 } }));
  }, [dispatch, playlists.data]);
  return (
    <div>
      <Playlists
        playlist={playlists.data[0]}
        isLoading={anthologyAlbums.loading}
        albums={anthologyAlbums.data}
        isAdmin
      />
      <Playlists
        playlist={playlists.data[1]}
        isLoading={balladUsUkAlbums.isLoading}
        albums={balladUsUkAlbums.data}
        isAdmin
      />
      <Switch>
        <Route path="/admin" />
        <Route path="/admin/" />
      </Switch>
    </div>
  );
};

export default AdminPage;
