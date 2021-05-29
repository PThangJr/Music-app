import formatDuration from "format-duration";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  randomSongs,
  removeNextSong,
  setNextSongs,
  updateSongList,
} from "../../../PlayerQueue/songsPlaySlice";
import { setCurrentSong } from "../../currentSongSlice";
import { nextSong, setIndexSong } from "../../indexSongSlice";
import { setFavoriteSongs, setPlayerControls } from "./playerControlsSlice";
import {
  choosePrevSong,
  setPrevSongs,
} from "../../../PlayerQueue/prevSongsSlice";
import "./styles.scss";
const PlayerControls = (props) => {
  const { handleProgressSong } = props;
  const dispatch = useDispatch();
  const indexSong = useSelector((state) => state.indexSong);
  const { indexCurrentSong } = indexSong;
  const songsPlay = useSelector((state) => state.songsPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  let songsList = songsPlay.data;

  const playerControls = useSelector((state) => state.playerControls);
  const currentSong = useSelector((state) => state.currentSong);
  const prevSongs = useSelector((state) => state.prevSongs);

  const { isPlaying, isRandom, favorites, isRepeat } = playerControls;
  const isFavorite = favorites.find(
    (fav) => fav?._id === songsList[indexCurrentSong]?._id
  );
  const audioRef = useRef();

  useEffect(() => {
    if (audioRef) {
      if (audioRef.current.src) {
        isPlaying ? audioRef.current.play() : audioRef.current.pause();
      }
    }
  }, [
    isPlaying,
    isRandom,
    songsPlay.data,
    indexCurrentSong,
    isRepeat,
    currentSong,
  ]);

  const togglePlayMusic = (status) => {
    // isPlaying ? audioRef.current.play() : audioRef.current.pause();
    dispatch(setPlayerControls({ isPlaying: status }));
  };
  const handleNextSong = () => {
    // dispatch(
    //   nextSong({
    //     indexCurrentSong:
    //       indexCurrentSong === songsList.length - 1 ? 0 : indexCurrentSong + 1,
    //   })
    // );
    // dispatch(setCurrentSong(songsList[1]));
    dispatch(setCurrentSong(songsList[0]));
    dispatch(removeNextSong());
    dispatch(setPrevSongs(songsList[0]));

    dispatch(setPlayerControls({ isPlaying: true }));
  };
  const handlePrevSong = () => {
    // dispatch(
    //   nextSong({
    //     indexCurrentSong:
    //       indexCurrentSong < 1 ? songsList.length - 1 : indexCurrentSong - 1,
    //   })
    // );

    dispatch(setCurrentSong(prevSongs.data[prevSongs.data.length - 2]));
    dispatch(choosePrevSong());
    dispatch(setNextSongs(prevSongs.data[prevSongs.data.length - 1]));
    dispatch(setPlayerControls({ isPlaying: true }));
  };
  const handleRandomSong = () => {
    dispatch(
      randomSongs({
        isRandom: !isRandom,
        songId: songsList[indexCurrentSong]._id,
      })
    );
    if (!isRandom) {
      dispatch(setIndexSong({ indexCurrentSong: 0 }));
    }
    dispatch(setPlayerControls({ isRandom: !isRandom }));
  };
  const handleFavoriteSong = () => {
    dispatch(setFavoriteSongs(songsList[indexCurrentSong]));
  };
  const handleRepeatSong = () => {
    audioRef.current.loop = !isRepeat;
    dispatch(setPlayerControls({ isRepeat: !isRepeat }));
  };
  const handleSeekSong = (e) => {
    const currentTime = (duration / 100) * e.target.value;
    audioRef.current.currentTime = currentTime;
    setCurrentTime(currentTime);
  };
  const handleVolumeSong = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value / 100;
  };

  const handleToggleVolume = (value) => {
    setVolume(value);
    audioRef.current.volume = value ? value / 100 : value;
  };
  const handleTimeUpdate = (e) => {
    if (isPlaying) {
      setCurrentTime(e.target.currentTime);
      handleProgressSong(e.target.currentTime);
    }
  };
  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
  };
  const handleEndedData = () => {
    dispatch(
      nextSong({
        indexCurrentSong:
          indexCurrentSong < 1 ? songsList.length - 1 : indexCurrentSong - 1,
      })
    );
  };
  return (
    <>
      <div className="player-controls">
        <div className="player-buttons">
          <button
            className={
              "btn player-buttons__favorite " +
              (isFavorite ? "btn--active" : "")
            }
            onClick={() => handleFavoriteSong()}
          >
            <i className="fas fa-heart"></i>
          </button>

          <button
            onClick={handleRandomSong}
            className={
              "btn player-buttons__random " + (isRandom ? "btn--active" : "")
            }
          >
            <i className="fas fa-random"></i>
          </button>
          <button
            onClick={handlePrevSong}
            className="btn player-buttons__previous"
          >
            <i className="fas fa-step-backward"></i>
          </button>
          {isPlaying ? (
            <button
              onClick={() => togglePlayMusic(false)}
              className="btn player-buttons__pause"
            >
              <i className="far fa-pause-circle"></i>
            </button>
          ) : (
            <button
              onClick={() => togglePlayMusic(true)}
              className="btn player-buttons__play"
            >
              <i className="far fa-play-circle"></i>
            </button>
          )}

          <button onClick={handleNextSong} className="btn player-buttons__next">
            <i className="fas fa-step-forward"></i>
          </button>
          <button
            onClick={handleRepeatSong}
            className={
              "btn player-buttons__repeat " + (isRepeat ? "btn--active" : "")
            }
          >
            <i className="fas fa-redo-alt"></i>
          </button>
          <a
            href={songsList[indexCurrentSong]?.linkMp3}
            className="btn player-buttons__download"
          >
            <i className="fas fa-download"></i>
          </a>
        </div>
        <div className="player-progress">
          <span className="player-progress__start">
            {formatDuration(currentTime * 1000)}
          </span>
          <input
            type="range"
            id="progress"
            value={(currentTime / duration) * 100 || 0}
            name="progress"
            min="0"
            max="100"
            onChange={handleSeekSong}
          />
          <span className="player-progress__end">
            {formatDuration(duration * 1000)}
          </span>
        </div>

        <audio
          controls
          className="d-none"
          src={currentSong.linkMp3}
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedData={handleLoadedData}
          onEnded={handleEndedData}
        ></audio>
      </div>
      <div className="player-actions">
        <div className="player-actions-volume">
          {parseInt(volume) ? (
            <p
              onClick={() => handleToggleVolume(0)}
              className="icon icon--left icon-volume "
            >
              <i className="fas fa-volume-up"></i>
            </p>
          ) : (
            <p
              onClick={() => handleToggleVolume(50)}
              className="icon icon--left  icon-volume "
            >
              <i className="fas fa-volume-mute"></i>
            </p>
          )}
          <input
            type="range"
            min={0}
            max={100}
            value={volume}
            name="volume"
            className="volume"
            onChange={handleVolumeSong}
          />
        </div>
        <p className="icon list-songs">
          <i className="fas fa-list-alt"></i>
        </p>
      </div>
    </>
  );
};

PlayerControls.propTypes = { linkMp3: PropTypes.string };

export default PlayerControls;
