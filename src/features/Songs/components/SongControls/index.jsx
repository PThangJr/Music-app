import React, { useState } from "react";
import ModalControls from "../../../../components/ModalControls";
import FormSongControls from "../FormSongControls";
import "./styles.scss";
const SongControls = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="controls">
      <button className="btn btn--blue" onClick={() => setIsOpen(true)}>
        <i className="fas fa-plus-square"></i>
        Thêm bài hát
      </button>
      <ModalControls
        isOpen={isOpen}
        handleChangeStatusModal={() => setIsOpen(!isOpen)}
        headingText="Thêm bài hát"
      >
        <FormSongControls />
      </ModalControls>
    </div>
  );
};

SongControls.propTypes = {};

export default SongControls;
