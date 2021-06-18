import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ButtonPlayAll from "../../../../components/Buttons/components/ButtonPlayAll";
import Card from "../../../../components/Card";
import SongsList from "../../../../components/SongsList";
import { fetchAlbumsOfSinger } from "../../../Albums/albumsSlice";
import { fetchSongs } from "../../../Songs/songsSlice";

const SingerDetail = (props) => {
  const dispatch = useDispatch();
  const { singerSlug } = useParams();
  useEffect(() => {
    dispatch(fetchSongs({ params: { singer: singerSlug, limit: 15 } }));
    dispatch(fetchAlbumsOfSinger({ singerSlug }));
  }, [dispatch, singerSlug]);
  const songs = useSelector((state) => state.songs);

  const albums = useSelector((state) => state.albums);
  const albumsData = albums.data;

  return (
    <div className="albums">
      <div className="row">
        <div className="col-xl-9 col-lg-9 col-md-12 col-12">
          <div className="albums-header">
            <h3 className="heading-15 albums-header__heading ">Bài hát</h3>
            <ButtonPlayAll songs={songs.data} />
          </div>
          <SongsList songs={songs.data} isLoading={songs.isLoading} fullInfo />
        </div>
        <div className="col-xl-3 col-lg-3 col-md-12 col-12">
          <h3 className="heading-15">Albums</h3>
          <div className="row">
            {albumsData.map((album) => {
              return (
                <div
                  key={album._id}
                  className="col-xl-6 col-lg-6 col-md-3 col-sm-4 col-6"
                >
                  <Card
                    album={album}
                    // isLoading={albums.isLoading}
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

SingerDetail.propTypes = {};

export default SingerDetail;
