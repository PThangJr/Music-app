import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSong from "../../components/CardSong";
import { setPlayerControls } from "../Player/components/PlayerControls/playerControlsSlice";
import { setIndexSong } from "../Player/indexSongSlice";
import SongsSuggestion from "./components/SongsSuggestion";
import "./styles.scss";
const PlayerQueue = () => {
  const songsPlay = useSelector((state) => state.songsPlay);
  const indexSong = useSelector((state) => state.indexSong);
  const currentSong = useSelector((state) => state.currentSong);
  const prevSongs = useSelector((state) => state.prevSongs);
  const { indexCurrentSong } = indexSong;
  const songsList = songsPlay.data;
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  const handleCurrentSong = (indexCurrentSong, songId) => {
    dispatch(
      setIndexSong({
        indexCurrentSong,
        songId,
      })
    );
    dispatch(setPlayerControls({ isPlaying: true }));
  };
  const handleFavoriteSong = (e) => {
    e.stopPropagation();
  };
  return (
    <div className="player-queue">
      <div className="player-queue-header">
        <p className="icon icon-close-player-queue">
          <i className="fas fa-times"></i>
        </p>
        <h3 className="player-queue-header__heading">Danh sách phát</h3>
      </div>
      <h4>Bài hát đang phát</h4>
      <ul className="player-queue-list">
        {currentSong._id && !prevSongs.data.length && (
          <li className={"player-queue-item  player-queue-item--active"}>
            <CardSong
              linkImage={currentSong.linkImage}
              name={currentSong.name}
              descriptions={currentSong.singers}
            />
            <button
              onClick={handleFavoriteSong}
              className={"btn btn--favorite "}
            ></button>
          </li>
        )}
        {prevSongs.data.map((song, index) => {
          return (
            <React.Fragment key={song._id + "-player-queue"}>
              <li
                className={
                  "player-queue-item " +
                  (song._id === currentSong._id
                    ? " player-queue-item--active"
                    : "")
                }
                onClick={() => handleCurrentSong(index, song._id)}
              >
                <CardSong
                  linkImage={song.linkImage}
                  name={song.name}
                  descriptions={song.singers}
                />
                <button
                  onClick={handleFavoriteSong}
                  className={"btn btn--favorite "}
                ></button>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
      <h3>Bài hát tiếp theo</h3>
      <ul className="player-queue-list">
        {songsList.map((song, index) => {
          return (
            <React.Fragment key={song._id + "-player-queue"}>
              <li
                className={"player-queue-item "}
                onClick={() => handleCurrentSong(index, song._id)}
              >
                <CardSong
                  linkImage={song.linkImage}
                  name={song.name}
                  descriptions={song.singers}
                />
                <button
                  onClick={handleFavoriteSong}
                  className={"btn btn--favorite "}
                ></button>
              </li>
            </React.Fragment>
          );
        })}
      </ul>
      {currentSong._id && <SongsSuggestion />}
    </div>
  );
};

export default PlayerQueue;
