import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSinger from "../../components/CardSinger";
import PlaylistsList from "../../components/PlaylistsList";
import Rank from "../../features/Rank";
import {
  fetchLoadMoreSongsOfRanking,
  fetchSongsOfRanking,
} from "../../features/Rank/songsOfRankingSlice";
import { fetchBestRandomSingers } from "../../features/Singers/singersSlice";
import Trending from "../../features/Trending";
import { fetchAnthologyAlbums } from "./anthologyAlbumsSlice";
import { fetchBalladUsUkAlbums } from "./balladUsUkAlbumSlice";
import { fetchPlaylists } from "./playlistsSlice";
import CardSkeletons from "../../components/Card/loading/CardSkeletons";
import { fetchHotAlbums } from "./hotAlbumsSlice";
const HomePage = () => {
  const dispatch = useDispatch();
  const anthologyAlbums = useSelector((state) => state.anthologyAlbums);
  const balladUsUkAlbums = useSelector((state) => state.balladUsUkAlbums);
  const hotAlbums = useSelector((state) => state.hotAlbums);
  const songsOfRanking = useSelector((state) => state.songsOfRanking);
  const playlists = useSelector((state) => state.playlists);
  const singers = useSelector((state) => state.singers);

  const { isLoadingMore, pagination } = songsOfRanking;
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
      dispatch(
        fetchHotAlbums({
          playlistSlug: playlists.data[2]?.slug,
          params: {
            limit: 6,
            page: 1,
          },
        })
      );
    }
    dispatch(fetchSongsOfRanking({ params: { limit: 10 } }));
  }, [dispatch, playlists.data]);
  const handleLoadMoreSongs = () => {
    console.log(songsOfRanking);
    dispatch(
      fetchLoadMoreSongsOfRanking({
        params: { limit: 10, page: songsOfRanking.pagination.page + 1 },
      })
    );
  };
  return (
    <div>
      <Trending />
      {/* {!anthologyAlbums.isLoading && <CardSkeletons totalItems={6} />} */}
      {playlists.isLoading || hotAlbums.isLoading ? (
        <div className="loading">
          <h3 className="heading-15">Loading...</h3>
          <CardSkeletons totalItems={6} />
        </div>
      ) : (
        <PlaylistsList
          playlist={playlists.data[2]}
          isLoading={hotAlbums.isLoading}
          albums={hotAlbums.data}
        />
      )}
      {playlists.isLoading || anthologyAlbums.isLoading ? (
        <div className="loading">
          <h3 className="heading-15">Loading...</h3>
          <CardSkeletons totalItems={6} />
        </div>
      ) : (
        <PlaylistsList
          playlist={playlists.data[0]}
          isLoading={anthologyAlbums.loading}
          albums={anthologyAlbums.data}
          isHaveSingers={true}
        />
      )}
      {playlists.isLoading || balladUsUkAlbums.isLoading ? (
        <div className="loading">
          <h3 className="heading-15">Loading...</h3>
          <CardSkeletons totalItems={6} />
        </div>
      ) : (
        <PlaylistsList
          playlist={playlists.data[1]}
          isLoading={balladUsUkAlbums.isLoading}
          albums={balladUsUkAlbums.data}
        />
      )}

      <div className="row">
        <div className="col-xl-9 col-lg-9 col-md-12">
          <Rank
            songs={songsOfRanking.data}
            isLoading={songsOfRanking.isLoading}
            handleLoadMore={handleLoadMoreSongs}
            isLoadingMore={isLoadingMore}
          />
        </div>
        <div className="col-xl-3 col-lg-3 col-md-12">
          <div className="singers-list">
            <div className="singers-list-header">
              <h3 className="heading-15 singers-list-header__heading">Ca sĩ</h3>
            </div>
            <div className="row">
              {singers.isLoading ? (
                <CardSkeletons
                  totalItems={8}
                  className="col-xl-6 col-lg-6 col-md-3 col-sm-4 col-6"
                />
              ) : (
                singers.data.map((singer) => {
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
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
