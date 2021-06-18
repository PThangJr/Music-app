import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../../components/Card";
import { clearAllAlbums, fetchAlbums } from "../../albumsSlice";
import ModalControls from "../../../../components/ModalControls";
import AlbumControls from "../../components/AlbumControls";
import { toast } from "react-toastify";

const AllAlbums = () => {
  const dispatch = useDispatch();
  //Redux store
  const albums = useSelector((state) => state.albums);
  const { isAdmin } = useSelector((state) => state.auths);

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);
  useEffect(() => {
    if (albums.errors) {
      toast.error(albums.errors, {
        onClose: () => dispatch(clearAllAlbums()),
      });
    } else if (albums.message) {
      toast.success(albums.message, {
        onClose: () => dispatch(clearAllAlbums()),
      });
    }
  }, [dispatch, albums.errors, albums.message]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="albums">
      <h3 className="heading-15">Albums</h3>
      {isAdmin && (
        <button className="btn btn--blue" onClick={() => setIsOpen(true)}>
          <i className="fas fa-plus-square"></i>
          Thêm album
        </button>
      )}
      <ModalControls
        isOpen={isOpen}
        headingText="Thêm album"
        handleChangeStatusModal={() => setIsOpen(!isOpen)}
      >
        <AlbumControls />
      </ModalControls>
      <div className="albums-list">
        <div className="row">
          {albums.data.map((album) => {
            return (
              <div
                key={album._id}
                className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6"
              >
                <Card album={album} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllAlbums;
