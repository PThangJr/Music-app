import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles.scss";
import FormSongControls from "../../../../features/Songs/components/FormSongControls";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { fetchDeleteSong } from "../../../../features/Songs/songsSlice";

const CardSongActions = (props) => {
  const dispatch = useDispatch();
  const { song } = props;
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
      <Modal
        isOpen={isOpen}
        aria={{
          labelledby: "heading",
          //   describedby: "full_description",
        }}
        appElement={document.getElementById("root")}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            position: "absolute",
            width: "100%",
            height: "500px",
            top: "50%",
            left: "50%",
            padding: "20px 40px",
            transform: "translate(-50%, -50%)",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
          },
        }}
      >
        <div className="controls-header">
          <h4 className="controls-header__heading">Thêm bài hát</h4>
          <button className="btn btn--danger" onClick={() => setIsOpen(false)}>
            Thoát
          </button>
        </div>
        <FormSongControls song={song} isUpdate />
      </Modal>
    </div>
  );
};

CardSongActions.propTypes = {};

export default CardSongActions;
