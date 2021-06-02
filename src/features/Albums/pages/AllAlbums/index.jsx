import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../../components/Card";
import { fetchAlbums } from "../../albumsSlice";

const AllAlbums = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);
  const albums = useSelector((state) => state.albums);

  return (
    <div className="albums">
      <h3 className="heading-15">Albums</h3>
      <div className="albums-list">
        <div className="row">
          {albums.data.map((album) => {
            return (
              <div key={album._id} className="col-xl-2">
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
