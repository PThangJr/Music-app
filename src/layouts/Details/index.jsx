import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSong from "../../components/CardSong";
import { fetchSongs } from "../../features/Player/songsSlice";
import AlbumsPage from "./pages/AlbumsPage";

const Details = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSongs({ limit: 12 }));
  }, [dispatch]);
  const songs = useSelector((state) => state.songs);
  return (
    <div className="details">
      <div className="row">
        <div className="col-xl-9 col-lg-9 col-md-12">
          <div className="row">
            <AlbumsPage />
          </div>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-12">
          <div className="songs-suggestion">
            <h3 className="songs-suggestion__heading heading-15">
              Bài hát gợi ý
            </h3>
            {songs.data.map((song) => {
              return <CardSong fullInfo song={song} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
