import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaylistsList from "../../components/PlaylistsList";
import Rank from "../../features/Rank";
import { fetchSongsOfRanking } from "../../features/Rank/songsOfRankingSlice";
import Trending from "../../features/Trending";
import { fetchAnthologyAlbums } from "./anthologyAlbumsSlice";
import { fetchBalladUsUkAlbums } from "./balladUsUkAlbumSlice";
import { fetchPlaylists } from "./playlistsSlice";
const HomePage = () => {
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
      <Trending />
      <PlaylistsList
        playlist={playlists.data[0]}
        isLoading={anthologyAlbums.loading}
        albums={anthologyAlbums.data}
      />
      <PlaylistsList
        playlist={playlists.data[1]}
        isLoading={balladUsUkAlbums.isLoading}
        albums={balladUsUkAlbums.data}
      />

      <div className="row">
        <div className="col-xl-9 col-lg-9 col-md-12">
          <Rank
            songs={songsOfRanking.data}
            isLoading={songsOfRanking.isLoading}
          />
        </div>
        <div className="col-xl-3 col-lg-3 col-md-12"></div>
      </div>
    </div>
  );
};

export default HomePage;
