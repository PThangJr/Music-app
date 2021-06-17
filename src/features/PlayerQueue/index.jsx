import classNames from "classnames";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SongsList from "../../components/SongsList";
import { setDisplayPlayerQueue } from "../../pages/HomePages/displayFormSlice";
import { setCurrentSong } from "../Player/currentSongSlice";
import { setPrevSongs } from "./prevSongsSlice";
import { setSongsPlay } from "./songsPlaySlice";
import "./styles.scss";
const PlayerQueue = () => {
  const songsPlay = useSelector((state) => state.songsPlay);
  const currentSong = useSelector((state) => state.currentSong);
  const prevSongs = useSelector((state) => state.prevSongs);
  const displayForm = useSelector((state) => state.displayForm);

  const songsList = songsPlay.data;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!prevSongs.data.length) {
      const [firstSong, ...otherSongs] = songsPlay.data;
      if (firstSong) {
        dispatch(setPrevSongs(firstSong));
        dispatch(setCurrentSong(firstSong));
        dispatch(setSongsPlay(otherSongs));
      }
    }
  }, [dispatch, prevSongs.data, songsPlay.data]);

  const handleFavoriteSong = (e) => {
    e.stopPropagation();
  };
  const handleClosePlayerQueue = () => {
    dispatch(setDisplayPlayerQueue({ playerQueue: false }));
  };
  return (
    <div
      className={classNames("player-queue", {
        "player-queue--active": displayForm.playerQueue,
      })}
    >
      <div className="player-queue-header">
        <p
          className="icon icon-close-player-queue"
          onClick={handleClosePlayerQueue}
        >
          <i className="fas fa-times"></i>
        </p>
        <h3 className="player-queue-header__heading">Danh sách phát</h3>
      </div>
      <ul className="player-queue-list">
        {currentSong._id && (
          <h4 className="player-queue-list__heading">Bài hát đang phát</h4>
        )}
        <SongsList songs={prevSongs.data} />
        {/* {prevSongs.data.map((song, index) => {
          return (
            <li
              key={song._id + "-player-queue"}
              className={
                "player-queue-item " +
                (song._id === currentSong._id
                  ? " player-queue-item--active"
                  : "")
              }
            >
              <CardSong song={song} />
            </li>
          );
        })} */}
      </ul>
      <ul className="player-queue-list">
        {songsList.length > 0 && (
          <h4 className="player-queue-list__heading">Bài hát tiếp theo</h4>
        )}
        <SongsList songs={songsList} />
      </ul>
      {/* {currentSong._id && <SongsSuggestion />} */}
    </div>
  );
};

export default PlayerQueue;
