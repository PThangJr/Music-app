import classNames from "classnames";
import formatDuration from "format-duration";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDisplayPlayerQueue } from "../../../../pages/HomePages/displayFormSlice";
import { addFavoriteSong } from "../../../Favorites/favoriteSongsSlice";
import {
  choosePrevSong,
  setPrevSongs,
} from "../../../PlayerQueue/prevSongsSlice";
import {
  randomSongs,
  removeNextSong,
  setNextSongs,
} from "../../../PlayerQueue/songsPlaySlice";
import { setCurrentSong } from "../../currentSongSlice";
import { setPlayerControls } from "./playerControlsSlice";
import "./styles.scss";
const PlayerControls = (props) => {
  const dispatch = useDispatch();
  const songsPlay = useSelector((state) => state.songsPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  let songsList = songsPlay.data;

  const playerControls = useSelector((state) => state.playerControls);
  const currentSong = useSelector((state) => state.currentSong);
  const prevSongs = useSelector((state) => state.prevSongs);
  const displayForm = useSelector((state) => state.displayForm);
  const favoriteSongs = useSelector((state) => state.favoriteSongs);

  const { isPlaying, isRandom, isRepeat } = playerControls;
  const isFavorite = favoriteSongs.find((fav) => fav?._id === currentSong?._id);
  const totalSongs = prevSongs.data.length + songsPlay.data.length;
  const audioRef = useRef();

  useEffect(() => {
    if (audioRef) {
      if (currentSong.linkMp3) {
        isPlaying ? audioRef.current.play() : audioRef.current.pause();
      } else {
        setCurrentTime(0);
        setDuration(0);
      }
    }
  }, [isPlaying, isRandom, songsPlay.data, isRepeat, currentSong]);
  const handleDisplayPlayerQueue = () => {
    dispatch(setDisplayPlayerQueue());
  };
  const togglePlayMusic = (status) => {
    // isPlaying ? audioRef.current.play() : audioRef.current.pause();
    if (currentSong.linkMp3) {
      dispatch(setPlayerControls({ isPlaying: status }));
    }
  };
  const handleNextSong = () => {
    if (!songsList.length) return;
    dispatch(setPlayerControls({ isPlaying: false }));
    dispatch(removeNextSong());
    dispatch(setCurrentSong(songsList[0]));
    dispatch(setPrevSongs(songsList[0]));
    dispatch(setPlayerControls({ isPlaying: true }));
  };
  const handlePrevSong = () => {
    if (prevSongs.data.length < 2) return;
    if (currentSong._id) {
      dispatch(setPlayerControls({ isPlaying: false }));
      dispatch(setCurrentSong(prevSongs.data[prevSongs.data.length - 2]));
      dispatch(choosePrevSong());
      dispatch(setNextSongs(prevSongs.data[prevSongs.data.length - 1]));
      dispatch(setPlayerControls({ isPlaying: true }));
    }
  };
  const handleRandomSong = () => {
    if (songsList.length) {
      dispatch(
        randomSongs({
          isRandom: !isRandom,
          songId: currentSong._id,
        })
      );
    }
    dispatch(setPlayerControls({ isRandom: !isRandom }));
  };
  const handleFavoriteSong = () => {
    if (!currentSong._id) return;
    dispatch(addFavoriteSong(currentSong));
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
      // handleProgressSong(e.target.currentTime);
    }
  };
  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
  };
  const handleEndedData = () => {
    if (songsList.length) {
      handleNextSong();
    } else {
      dispatch(setPlayerControls({ isPlaying: false }));
    }
  };
  return (
    <>
      <div className="player-controls">
        <div className="player-buttons">
          <button
            // className={
            //   "btn btn--primary player-buttons__favorite " +
            //   (isFavorite ? "btn--active" : "")
            // }
            className={classNames(
              "btn btn--primary player-buttons__favorite hide-on-mobile",
              { "btn--active": isFavorite }
            )}
            onClick={() => handleFavoriteSong()}
          >
            <i className="fas fa-heart"></i>
          </button>

          <button
            onClick={handleRandomSong}
            className={classNames("btn btn--primary player-buttons__random ", {
              "btn--active": isRandom,
            })}
          >
            <i className="fas fa-random"></i>
          </button>
          <button
            onClick={handlePrevSong}
            className="btn btn--primary player-buttons__previous"
          >
            <i className="fas fa-step-backward"></i>
          </button>
          {isPlaying ? (
            <button
              onClick={() => togglePlayMusic(false)}
              className="btn btn--primary player-buttons__pause"
            >
              <i className="far fa-pause-circle"></i>
            </button>
          ) : (
            <button
              onClick={() => togglePlayMusic(true)}
              className="btn btn--primary player-buttons__play"
            >
              <i className="far fa-play-circle"></i>
            </button>
          )}

          <button
            onClick={handleNextSong}
            className="btn btn--primary player-buttons__next"
          >
            <i className="fas fa-step-forward"></i>
          </button>
          <button
            onClick={handleRepeatSong}
            className={
              "btn btn--primary player-buttons__repeat " +
              (isRepeat ? "btn--active" : "")
            }
          >
            <i className="fas fa-redo-alt"></i>
          </button>
          <a
            href={currentSong?.linkMp3}
            className="btn btn--primary player-buttons__download hide-on-mobile"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fas fa-download"></i>
          </a>
        </div>
        <div className="player-progress">
          <button
            className={classNames(
              "btn btn--primary player-buttons__favorite btn--controls show-on-mobile",
              { "btn--active": isFavorite }
            )}
            onClick={() => handleFavoriteSong()}
          >
            <i className="fas fa-heart"></i>
          </button>
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
          <a
            href={currentSong?.linkMp3}
            className="btn btn--primary btn--controls player-buttons__download show-on-mobile"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fas fa-download"></i>
          </a>
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
        <p
          className={classNames("icon list-songs", {
            "btn--purple": displayForm.playerQueue,
          })}
          onClick={handleDisplayPlayerQueue}
        >
          <i className="fas fa-list-alt"></i>
          <span className="number-of-songs">{totalSongs}</span>
        </p>
      </div>
    </>
  );
};

PlayerControls.propTypes = { linkMp3: PropTypes.string };

export default PlayerControls;
