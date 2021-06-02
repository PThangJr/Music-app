import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SongsList from "../../../../components/SongsList";
import SongControls from "../../components/SongControls";
import { fetchSongs } from "../../songsSlice";
import "./styles.scss";
const AllSongs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSongs({ params: { limit: 50 } }));
  }, [dispatch]);
  const songs = useSelector((state) => state.songs);
  const { isAdmin } = useSelector((state) => state.auths);

  return (
    <div className="songs">
      <div className="songs-header">
        <h3 className="heading-15">Bài hát</h3>
        {isAdmin && <SongControls />}
      </div>
      <div className="row">
        <div className="col-xl-9 col-lg-9 col-md-12">
          <SongsList songs={songs.data} fullInfo isLoading={songs.isLoading} />
        </div>
      </div>
    </div>
  );
};

export default AllSongs;
