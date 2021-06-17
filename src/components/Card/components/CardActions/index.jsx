import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchDeleteAlbum } from "../../../../features/Albums/albumsSlice";
import AlbumControls from "../../../../features/Albums/components/AlbumControls";
import ModalControls from "../../../ModalControls";
import "./styles.scss";
const CardActions = ({ album = { _id: "" } }) => {
  const dispatch = useDispatch();

  //State
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteAlbum = () => {
    if (window.confirm("Bạn có muốn xóa album này không ??")) {
      if (album._id) {
        dispatch(fetchDeleteAlbum({ albumId: album._id }));
      }
    }
  };
  const handleUpdateAlbum = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="card-actions">
      <button className="btn btn--green" onClick={handleUpdateAlbum}>
        Sửa
      </button>
      <button className="btn btn--danger" onClick={handleDeleteAlbum}>
        Xóa
      </button>
      <ModalControls
        isOpen={isOpen}
        handleChangeStatusModal={() => setIsOpen(!isOpen)}
        headingText="Cập nhật album"
      >
        <AlbumControls isUpdate album={album} />
      </ModalControls>
    </div>
  );
};

CardActions.propTypes = {
  album: PropTypes.object,
};

export default CardActions;
