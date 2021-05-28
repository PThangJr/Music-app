import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PlayerControls from "./components/PlayerControls";
import { setIndexSong } from "./indexSongSlice";
import { fetchSongs } from "./songsSlice";
import "./styles.scss";
const Player = () => {
  const dispatch = useDispatch();
  const indexSong = useSelector((state) => state.indexSong);
  const { indexCurrentSong } = indexSong;
  const playerControls = useSelector((state) => state.playerControls);
  const songs = useSelector((state) => state.songs);
  const songsPlay = useSelector((state) => state.songsPlay);
  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);
  useEffect(() => {
    if (songsPlay.data.length) {
      dispatch(
        setIndexSong({
          ...JSON.parse(localStorage.getItem("currentSong")),
        })
      );
    }
  }, [dispatch, songs.data]);

  return (
    <div className="player">
      <div className="container-md player">
        <div className="player-content">
          <div className="player-image">
            <img
              src={
                songsPlay.data[indexCurrentSong]?.linkImage ||
                "https://thesocialmediamonthly.com/wp-content/uploads/2018/07/mp3-logo.png"
              }
              alt=""
              className="player-image__img"
            />
          </div>
          <div className="player-info">
            <p className="player-info__name">
              {songsPlay.data[indexCurrentSong]?.name}
            </p>
            <Link to="/" className="player-info__singers">
              {songsPlay.data[indexCurrentSong]?.singers.map((singer) => {
                return singer.name;
              })}
            </Link>
          </div>
        </div>
        <PlayerControls
          songs={songsPlay.data}
          linkMp3={songsPlay.data[indexCurrentSong]?.linkMp3}
        />
      </div>
    </div>
  );
};

export default Player;
