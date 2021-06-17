import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CBoxField from "../../../../components/Form/FormField/CBoxField";
import InputField from "../../../../components/Form/FormField/InputField";
import { fetchPlaylists } from "../../../Playlists/playlistsSlice";
import { fetchCreateAlbum, fetchUpdateAlbum } from "../../albumsSlice";
import PropTypes from "prop-types";
const mapObjectToArray = (object) => {
  const keys = Object.keys(object);
  const result = keys.filter((item) => {
    return object[item] === true;
  });
  return result;
};
const AlbumControls = (props) => {
  const { album = {}, isUpdate = false } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPlaylists());
  }, [dispatch]);

  const playlists = useSelector((state) => state.playlists);
  const [dataInput, setDataInput] = useState({});
  const [dataPlaylists, setDataPlaylists] = useState({});
  const handleSubmitFormAlbum = (e) => {
    e.preventDefault();
    const dataPlaylistsResult = mapObjectToArray(dataPlaylists);
    const data = { ...dataInput, playlists: dataPlaylistsResult };
    if (isUpdate) {
      dispatch(
        fetchUpdateAlbum({ albumId: album?._id, data: { ...album, ...data } })
      );
    } else {
      dispatch(fetchCreateAlbum(data));
    }
  };
  const handleChangeInput = (values) => {
    setDataInput({ ...dataInput, ...values });
  };
  const handleChangeCheckbox = (values) => {
    setDataPlaylists({ ...dataPlaylists, ...values });
  };
  console.log(`dataPlaylists`, dataPlaylists);
  return (
    <div className="controls">
      <div className="row">
        <div className="col-xl-6">
          <form
            action=""
            className="form-album"
            onSubmit={handleSubmitFormAlbum}
          >
            <InputField
              placeholder="Tên album..."
              name="name"
              onChange={handleChangeInput}
              fullWidth
              defaultValues={album?.name}
            />
            <InputField
              placeholder="Link Image..."
              name="linkImage"
              onChange={handleChangeInput}
              fullWidth
              defaultValues={album?.linkImage}
            />
            <div className="checkbox-box">
              <h4 className="checkbox-box__heading">Playlists :</h4>
              {playlists.data.map((playlist) => {
                return (
                  <CBoxField
                    key={playlist?._id}
                    name={playlist?._id}
                    label={playlist?.name}
                    onChange={handleChangeCheckbox}
                    defaultChecked={
                      album?.playlists?.some(
                        (pl) => pl._id === playlist?._id
                      ) || false
                    }
                  />
                );
              })}
            </div>
            <div className="buttons">
              <button type="submit" className="btn btn--full-width btn--blue">
                {isUpdate ? "Cập nhật album" : "Thêm album"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

AlbumControls.propTypes = {
  album: PropTypes.object,
  isUpdate: PropTypes.bool,
};

export default AlbumControls;
