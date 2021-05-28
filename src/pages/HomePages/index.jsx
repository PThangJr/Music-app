import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPlayerControls } from "../../features/Player/components/PlayerControls/playerControlsSlice";
import { fetchSongsOfAlbum } from "../../features/PlayerQueue/songsOfAlbumSlice";
import Playlists from "../../features/Playlists";
import Rank from "../../features/Rank";
import Trending from "../../features/Trending";
import { fetchAnthologyAlbums } from "./anthologyAlbumsSlice";
import { fetchBalladUsUkAlbums } from "./balladUsUkAlbumSlice";
import { fetchPlaylists } from "./playlistsSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const albums = useSelector((state) => state.albums);
  const anthologyAlbums = useSelector((state) => state.anthologyAlbums);
  const balladUsUkAlbums = useSelector((state) => state.balladUsUkAlbums);
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
  }, [dispatch, playlists.data]);
  const handleChooseAlbum = (albumSlug) => {
    console.log(albumSlug);
    dispatch(fetchSongsOfAlbum({ albumSlug }));
    dispatch(setPlayerControls({ isPlaying: true }));
  };
  return (
    <div>
      <Trending />
      <Playlists
        albums={anthologyAlbums.data}
        type={playlists.data[0]?.slug}
        name={playlists.data[0]?.name}
        linkName={`/playlists/${playlists.data[0]?.slug}`}
      />
      <Playlists
        albums={balladUsUkAlbums.data}
        name={playlists.data[1]?.name}
        type={playlists.data[1]?.slug}
        linkName={`/playlists/${playlists.data[1]?.slug}`}
      />
      {/* <Playlists type={playlists.data[1]?.slug} /> */}
      {/* {playlists.data.map((playlist) => {
        const name = playlist.name;
        const linkName = `/playlists/${playlist.slug}`;
        const playlistSlug = playlist.slug;

        return (
          <Playlists key={playlist._id} name={name} linkName={linkName}>
            {albums.data
              .filter((album) => album.playlists[0].slug === playlistSlug)
              .map((album) => {
                console.log(album);
                const { linkImage } = album;
                const title = album.name;
                const linkTitle = `/albums/${album.slug}`;

                return (
                  <div
                    key={album._id}
                    className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-6"
                  >
                    <Card
                      title={title}
                      linkImage={linkImage}
                      linkTitle={linkTitle}
                      slugTitle={album.slug}
                      handleChooseAlbum={handleChooseAlbum}
                    />
                  </div>
                );
              })}
          </Playlists>
        );
      })} */}

      <div className="row">
        <div className="col-xl-9 col-lg-9 col-md-12">
          <Rank />
        </div>
        <div className="col-xl-3 col-lg-3 col-md-12">
          {/* {playlists.data.map((playlist) => {
            const name = playlist.name;
            const linkName = `/albums/${playlist.slug}`;
            return (
              <Playlists key={playlist._id} name={name} linkName={linkName}>
                {albums.data.map((album) => {
                  const { linkImage } = album;
                  const title = album.name;
                  const linkTitle = `/albums/${album.slug}`;
                  return (
                    <div
                      key={album._id}
                      className="col-xl-6 col-lg-6 col-md-3 col-sm-4 col-6"
                    >
                      <Card
                        title={title}
                        linkImage={linkImage}
                        linkTitle={linkTitle}
                      />
                    </div>
                  );
                })}
              </Playlists>
            );
          })} */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
