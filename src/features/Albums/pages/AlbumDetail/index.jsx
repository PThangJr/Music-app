import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ButtonPlayAll from "../../../../components/Buttons/components/ButtonPlayAll";
import Card from "../../../../components/Card";
import SongsList from "../../../../components/SongsList";
import { fetchSongs } from "../../../Songs/songsSlice";
import { fetchAlbums } from "../../albumsSlice";
import "./styles.scss";
const AlbumDetail = (props) => {
  const dispatch = useDispatch();
  const { albumSlug } = useParams();
  useEffect(() => {
    dispatch(fetchSongs({ params: { album: albumSlug } }));
    dispatch(fetchAlbums({ params: { limit: 7 } }));
  }, [dispatch, albumSlug]);
  const songs = useSelector((state) => state.songs);
  const albums = useSelector((state) => state.albums);
  const albumsData = albums.data.filter((album) => album.slug !== albumSlug);
  const currentAlbum = albums.data.filter(
    (album) => album.slug === albumSlug
  )[0];

  return (
    <div className="albums">
      <h3 className="albums__heading">{currentAlbum?.name || ""} </h3>
      <div className="row">
        <div className="col-xl-9 col-lg-8 col-md-12 col-12">
          <div className="heading-15 albums-header">
            <h3 className="albums-header__heading">Bài hát</h3>
            <ButtonPlayAll songs={songs.data} />
          </div>
          <SongsList fullInfo songs={songs.data} isLoading={songs.isLoading} />
        </div>
        <div className="col-xl-3 col-lg-4 col-md-12 col-12">
          <h3 className="heading-15">Albums gợi ý</h3>
          <div className="row">
            {albumsData.map((album) => {
              return (
                <div
                  key={album._id}
                  className="col-xl-6 col-lg-6 col-md-3 col-sm-4 col-6"
                >
                  <div className="card-album">
                    <Card album={album} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

AlbumDetail.propTypes = {};

export default AlbumDetail;
