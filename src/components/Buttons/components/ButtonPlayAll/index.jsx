import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import { useDispatch } from "react-redux";
import {
  removeNextSongs,
  updateSongList,
} from "../../../../features/PlayerQueue/songsPlaySlice";
import { removePrevSongs } from "../../../../features/PlayerQueue/prevSongsSlice";
import { setPlayerControls } from "../../../../features/Player/components/PlayerControls/playerControlsSlice";
const ButtonPlayAll = (props) => {
  const { songs } = props;
  const dispatch = useDispatch();
  const handlePlayAll = () => {
    dispatch(removeNextSongs([]));
    dispatch(removePrevSongs());
    dispatch(updateSongList(songs));
    dispatch(setPlayerControls({ isPlaying: true }));
  };
  return (
    <button
      className="btn btn--primary btn--md btn--orange"
      onClick={handlePlayAll}
    >
      Phát tất cả <i className="fas fa-play"></i>
    </button>
  );
};

ButtonPlayAll.propTypes = {
  songs: PropTypes.array.isRequired,
};

export default ButtonPlayAll;
