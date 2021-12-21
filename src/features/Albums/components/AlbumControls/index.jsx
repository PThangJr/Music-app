import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CBoxField from "../../../../components/Form/FormField/CBoxField";
import InputField from "../../../../components/Form/FormField/InputField";
import { fetchPlaylists } from "../../../Playlists/playlistsSlice";
import { fetchCreateAlbum, fetchUpdateAlbum } from "../../albumsSlice";
import PropTypes from "prop-types";
import { fetchSingers } from "../../../Singers/singersSlice";

const AlbumControls = (props) => {
  const {
    album = { playlists: [], categories: [], singers: [] },
    isUpdate = false,
  } = props;
  const dispatch = useDispatch();

  const [dataInput, setDataInput] = useState({});
  const [dataCheckBox, setDataCheckBox] = useState({
    playlists: [],
    categories: [],
    singers: [],
  });

  useEffect(() => {
    dispatch(fetchPlaylists());
    dispatch(fetchSingers());
  }, [dispatch]);
  useEffect(() => {
    if (album) {
      const { name, linkImage } = album;
      const playlists = album.playlists.map((item) => item._id);
      const categories = album.categories.map((item) => item._id);
      const singers = album.singers.map((item) => item._id);

      setDataInput({ name, linkImage });
      setDataCheckBox({ playlists, categories, singers });
    }
  }, []);
  //Store
  const playlists = useSelector((state) => state.playlists);
  const categories = useSelector((state) => state.categories);
  const singers = useSelector((state) => state.singers);

  //

  const handleSubmitFormAlbum = (e) => {
    e.preventDefault();
    const data = {
      ...dataInput,
      ...dataCheckBox,
    };
    if (isUpdate) {
      dispatch(fetchUpdateAlbum({ albumId: album?._id, data }));
    } else {
      dispatch(fetchCreateAlbum(data));
    }
  };
  const handleChangeInput = (values) => {
    setDataInput({ ...dataInput, ...values });
  };
  const handleChangeCheckBox = (name, values) => {
    const isChecked = dataCheckBox[name].includes(values[name]);
    if (isChecked) {
      const dataFilter = [...dataCheckBox[name], values[name]].filter(
        (item) => item !== values[name]
      );
      setDataCheckBox({
        ...dataCheckBox,
        [name]: dataFilter,
      });
    } else {
      setDataCheckBox({
        ...dataCheckBox,
        [name]: [...dataCheckBox[name], values[name]],
      });
    }
  };

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
              value={dataInput.name}
              fullWidth
            />
            <InputField
              placeholder="Link Image..."
              name="linkImage"
              onChange={handleChangeInput}
              value={dataInput.linkImage}
              fullWidth
            />
            <div className="checkbox-box">
              <h4 className="checkbox-box__heading">Playlists :</h4>
              {playlists.data.map((playlist) => {
                return (
                  <CBoxField
                    key={playlist?._id}
                    name="playlists"
                    label={playlist?.name}
                    dataId={playlist?._id}
                    onChange={(values) =>
                      handleChangeCheckBox("playlists", values)
                    }
                    checked={dataCheckBox.playlists.includes(playlist?._id)}
                  />
                );
              })}
            </div>
            <div className="checkbox-box">
              <h4 className="checkbox-box__heading">Thể loại :</h4>
              {categories.data.map((category) => {
                return (
                  <CBoxField
                    key={category?._id}
                    name="categories"
                    label={category?.name}
                    dataId={category?._id}
                    onChange={(values) =>
                      handleChangeCheckBox("categories", values)
                    }
                    checked={dataCheckBox.categories.includes(category?._id)}
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
        <div className="col-6">
          <div className="checkbox-box">
            <h4 className="checkbox-box__heading">Ca sĩ :</h4>
            {singers.data.map((singer) => {
              return (
                <CBoxField
                  key={singer?._id}
                  name="singers"
                  label={singer?.name}
                  dataId={singer?._id}
                  onChange={(values) => handleChangeCheckBox("singers", values)}
                  checked={dataCheckBox.singers.includes(singer?._id)}
                />
              );
            })}
          </div>
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
