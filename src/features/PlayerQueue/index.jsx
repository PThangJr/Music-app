import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSong from "../../components/CardSong";
import { setPlayerControls } from "../Player/components/PlayerControls/playerControlsSlice";
import { setIndexSong } from "../Player/indexSongSlice";
import "./styles.scss";
const PlayerQueue = () => {
  const songsPlay = useSelector((state) => state.songsPlay);
  const indexSong = useSelector((state) => state.indexSong);

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
      <ul className="player-queue-list">
        {songsList.map((song, index) => {
          return (
            <React.Fragment key={song._id}>
              <li
                className={
                  "player-queue-item " +
                  (index === indexCurrentSong
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
    </div>
  );
};

export default PlayerQueue;
