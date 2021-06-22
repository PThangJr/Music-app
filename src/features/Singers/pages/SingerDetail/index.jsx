import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ButtonPlayAll from "../../../../components/Buttons/components/ButtonPlayAll";
import Card from "../../../../components/Card";
import CardSkeletons from "../../../../components/Card/loading/CardSkeletons";
import CardSinger from "../../../../components/CardSinger";
import SongsList from "../../../../components/SongsList";
import { fetchAlbumsOfSinger } from "../../../Albums/albumsOfSingerSlice";
import { fetchAlbums } from "../../../Albums/albumsSlice";
import { fetchSongs } from "../../../Songs/songsSlice";
import { fetchSingerDetail } from "../../singerDetailSlice";
import "./styles.scss";
const SingerDetail = (props) => {
  const dispatch = useDispatch();
  const { singerSlug } = useParams();
  useEffect(() => {
    dispatch(fetchSongs({ params: { singer: singerSlug, limit: 12 } }));
    dispatch(fetchAlbums({ params: { limit: 9 } }));
    dispatch(fetchAlbumsOfSinger({ singerSlug }));
    dispatch(fetchSingerDetail({ singerSlug }));
  }, [dispatch, singerSlug]);
  const songs = useSelector((state) => state.songs);
  const albums = useSelector((state) => state.albums);
  const albumsOfSinger = useSelector((state) => state.albumsOfSinger);
  const singerDetail = useSelector((state) => state.singerDetail);
  // console.log(`albumsOfSinger.data`, albumsOfSinger.data);
  // console.log(`albums.data`, albums.data);
  let albumsFilter = albums.data.filter((album) => {
    return albumsOfSinger.data.some((alb) => alb._id !== album._id);
  });
  albumsFilter = albumsFilter.length ? albumsFilter : albums.data;
  return (
    <div className="albums">
      <div className="row">
        <div className="col-xl-2 col-lg-2 col-md-3 col-sm-12 col-12">
          <h3 className="heading-15 albums-header__heading ">Ca sĩ</h3>
          {singerDetail.isLoading ? (
            <CardSkeletons totalItems={1} className="col-12" />
          ) : (
            <CardSinger singer={singerDetail.data} />
          )}
        </div>
        <div className="col-xl-10 col-lg-10 col-md-9 col-sm-12 col-12">
          <div className="row">
            <div className="albums-header">
              <h3 className="heading-15 albums-header__heading ">Bài hát</h3>
              <ButtonPlayAll songs={songs.data} />
            </div>
            <div className="albums-songs">
              <SongsList
                songs={songs.data}
                isLoading={songs.isLoading}
                fullInfo
              />
            </div>
            <h3 className="heading-15 albums-header__heading ">Albums</h3>
            {albumsOfSinger.isLoading ? (
              <CardSkeletons
                totalItems={10}
                className="col-xl-2-5 col-lg-3 col-md-4 col-sm-4 col-6"
              />
            ) : (
              albumsOfSinger.data.map((album) => {
                return (
                  <div
                    key={album._id}
                    className="col-xl-2-5 col-lg-3 col-md-4 col-sm-4 col-6"
                  >
                    <Card album={album} />
                  </div>
                );
              })
            )}
            {albumsFilter.map((album) => {
              return (
                <div
                  key={album._id}
                  className="col-xl-2-5 col-lg-3 col-md-4 col-sm-4 col-6"
                >
                  <Card album={album} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

SingerDetail.propTypes = {};

export default SingerDetail;
