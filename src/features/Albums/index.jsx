import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Card from "../../components/Card";
import CardSong from "../../components/CardSong";
import { fetchSongsOfAlbum } from "../PlayerQueue/songsOfAlbumSlice";
import { fetchAlbums } from "../Playlists/albumsSlice";

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
  return (
    <div className="albums">
      <div className="row">
        <div className="col-xl-9 col-lg-9 col-md-12 col-12">
          <h3 className="albums__heading heading-15">Bài hát</h3>
          {songsOfAlbum.data.map((song) => {
            return (
              <CardSong
                key={song._id}
                fullInfo
                name={song.name}
                linkImage={song.linkImage}
                descriptions={song.singers}
                views={song.views}
              />
            );
          })}
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
