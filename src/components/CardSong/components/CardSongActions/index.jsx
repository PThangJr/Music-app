import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FormSongControls from "../../../../features/Songs/components/FormSongControls";
import { fetchDeleteSong } from "../../../../features/Songs/songsSlice";
import ModalControls from "../../../ModalControls";
import "./styles.scss";
import PropTypes from "prop-types";
const CardSongActions = (props) => {
  const dispatch = useDispatch();
  const { song = { _id: "" } } = props;
  const handleDeleteSong = () => {
    if (window.confirm("Bạn có muốn xóa bài hát này không ??")) {
      if (song?._id) {
        dispatch(fetchDeleteSong(song?._id));
      }
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="card-song-actions">
      <div className="card-song-actions-btn">
        <button
          className="btn btn--green"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Sửa
        </button>
        <button className="btn btn--danger" onClick={handleDeleteSong}>
          Xóa
        </button>
      </div>
      <ModalControls
        isOpen={isOpen}
        handleChangeStatusModal={() => setIsOpen(!isOpen)}
        headingText="Sửa bài hát"
      >
        <FormSongControls song={song} isUpdate />
      </ModalControls>
    </div>
  );
};

CardSongActions.propTypes = {
  song: PropTypes.object,
};

export default CardSongActions;
