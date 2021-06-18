import classNames from "classnames";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SongsList from "../../components/SongsList";
import { setDisplayPlayerQueue } from "../../pages/HomePages/displayFormSlice";
import { setPlayerControls } from "../Player/components/PlayerControls/playerControlsSlice";
import { removeCurrerntSong, setCurrentSong } from "../Player/currentSongSlice";
import {
  removePrevSongs,
  removePrevSongsExceptCurrentSong,
  setPrevSongs,
} from "./prevSongsSlice";
import { removeNextSongs, setSongsPlay } from "./songsPlaySlice";
import "./styles.scss";
const PlayerQueue = () => {
  const songsPlay = useSelector((state) => state.songsPlay);
  const currentSong = useSelector((state) => state.currentSong);
  const prevSongs = useSelector((state) => state.prevSongs);
  const displayForm = useSelector((state) => state.displayForm);
  const playerControls = useSelector((state) => state.playerControls);

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

  // const handleFavoriteSong = (e) => {
  //   e.stopPropagation();
  // };
  const handleClosePlayerQueue = () => {
    dispatch(setDisplayPlayerQueue({ playerQueue: false }));
  };
  const handleRemovePrevSongs = () => {
    if (window.confirm("Bạn có muốn xoá danh sách phát hiện tại?")) {
      if (playerControls.isPlaying) {
        dispatch(removePrevSongsExceptCurrentSong({ currentSong }));
      } else {
        dispatch(removePrevSongs());
        dispatch(setPlayerControls({ isPlaying: false }));
        dispatch(removeCurrerntSong());
      }
    }
  };
  const handleRemoveSongsPlay = () => {
    if (window.confirm("Bạn có muốn xoá danh sách phát tiếp theo?")) {
      dispatch(removeNextSongs());
    }
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
          <div className="player-queue-list-header">
            <h3 className="player-queue-list-header__heading">
              Bài hát đang phát
            </h3>
            <p
              className="player-queue-list-header__remove"
              onClick={handleRemovePrevSongs}
            >
              Xoá ds phát
            </p>
          </div>
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
          <div className="player-queue-list-header">
            <h3 className="player-queue-list-header__heading">
              Bài hát tiếp theo
            </h3>
            <p
              className="player-queue-list-header__remove"
              onClick={handleRemoveSongsPlay}
            >
              Xoá tất cả
            </p>
          </div>
        )}
        <SongsList songs={songsList} />
      </ul>
      {/* {currentSong._id && <SongsSuggestion />} */}
    </div>
  );
};

export default PlayerQueue;
