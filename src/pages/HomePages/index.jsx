import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlaylistsList from "../../components/PlaylistsList";
import Rank from "../../features/Rank";
import { fetchSongsOfRanking } from "../../features/Rank/songsOfRankingSlice";
import { fetchBestRandomSingers } from "../../features/Singers/singersSlice";
import Trending from "../../features/Trending";
import { fetchAnthologyAlbums } from "./anthologyAlbumsSlice";
import { fetchBalladUsUkAlbums } from "./balladUsUkAlbumSlice";
import { fetchPlaylists } from "./playlistsSlice";
import CardSinger from "../../components/CardSinger";
const HomePage = () => {
  const dispatch = useDispatch();
  const anthologyAlbums = useSelector((state) => state.anthologyAlbums);
  const balladUsUkAlbums = useSelector((state) => state.balladUsUkAlbums);
  const songsOfRanking = useSelector((state) => state.songsOfRanking);
  const playlists = useSelector((state) => state.playlists);
  const singers = useSelector((state) => state.singers);
  useEffect(() => {
    dispatch(fetchPlaylists());
    dispatch(fetchBestRandomSingers({ params: { limit: 8 } }));
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
        <div className="col-xl-3 col-lg-3 col-md-12">
          <div className="singers-list">
            <div className="singers-list-header">
              <h3 className="heading-15 singers-list-header__heading">Ca sĩ</h3>
            </div>
            <div className="row">
              {singers.data.map((singer) => {
                return (
                  <div
                    key={singer?._id}
                    className="col-xl-6 col-lg-6 col-md-3 col-sm-4 col-6"
                  >
                    <CardSinger
                      singer={singer}
                      isLoading={singers?.isLoading}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
