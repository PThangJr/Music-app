import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Card from "../../components/Card";
import { fetchSongsOfAlbum } from "../PlayerQueue/songsOfAlbumSlice";
import { fetchAlbums } from "../Playlists/albumsSlice";
import Songs from "../Songs";
import "./styles.scss";
const Albums = (props) => {
  const dispatch = useDispatch();
  const { albumSlug } = useParams();
  useEffect(() => {
    dispatch(fetchSongsOfAlbum({ albumSlug }));
    dispatch(fetchAlbums());
  }, [dispatch, albumSlug]);
  const songsOfAlbum = useSelector((state) => state.songsOfAlbum);
  const albums = useSelector((state) => state.albums);
  const albumsData = albums.data.filter((album) => album.slug !== albumSlug);
  const currentAlbum = albums.data.filter(
    (album) => album.slug === albumSlug
  )[0];

  return (
    <div className="albums">
      <h3 className="albums__heading">{currentAlbum?.name || ""} </h3>
      <div className="row">
        <div className="col-xl-9 col-lg-9 col-md-12 col-12">
          <h3 className=" heading-15">Bài hát</h3>
          {/* {songsOfAlbum.data.map((song) => {
            return <CardSong key={song._id} fullInfo song={song} />;
          })} */}
          <Songs
            fullInfo
            songs={songsOfAlbum.data}
            isLoading={songsOfAlbum.isLoading}
          />
          {/* <Songs
            fullInfo
            songs={songsOfAlbum.data}
            isLoading={songsOfAlbum.isLoading}
          /> */}
        </div>
        <div className="col-xl-3 col-lg-3 col-md-12 col-12">
          <h3 className="heading-15">Albums gợi ý</h3>
          <div className="row">
            {albumsData.map((album) => {
              return (
                <div
                  key={album._id}
                  className="col-xl-6 col-lg-6 col-md-3 col-sm-4 col-6"
                >
                  <Card
                    linkImage={album.linkImage}
                    title={album.name}
                    descriptions={album.singers}
                    album={album}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

Albums.propTypes = {};

export default Albums;
