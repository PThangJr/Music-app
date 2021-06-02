import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CBoxField from "../../../../components/Form/FormField/CBoxField/index.jsx";
import InputField from "../../../../components/Form/FormField/InputField";
import { fetchAlbums } from "../../../Albums/albumsSlice.js";
import { fetchAuthors } from "../../../Authors/authorsSlice.js";
import { fetchCategories } from "../../../Categories/categoriesSlice.js";
import { fetchSingers } from "../../../Singers/singersSlice.js";
import {
  clearMessageAndErrors,
  fetchCreateSong,
  fetchUpdateSong,
} from "../../songsSlice.js";
import { toast } from "react-toastify";
import "./styles.scss";

const mapObjectToArray = (object) => {
  const keys = Object.keys(object);
  const result = keys.filter((item) => {
    return object[item] === true;
  });
  return result;
};
const mapArrayToIdArray = (array) => {
  if (array) {
    return array.map((item) => item?._id);
  } else return [];
};

const FormSongControls = (props) => {
  const { isUpdate, song = {} } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingers());
    dispatch(fetchCategories());
    dispatch(fetchAlbums());
    dispatch(fetchAuthors());
  }, [dispatch]);
  const singers = useSelector((state) => state.singers);
  const categories = useSelector((state) => state.categories);
  const albums = useSelector((state) => state.albums);
  const authors = useSelector((state) => state.authors);
  const songs = useSelector((state) => state.songs);
  console.log(songs.message);

  useEffect(() => {
    if (songs.errors) {
      toast.error(songs.errors, {
        onClose: () => dispatch(clearMessageAndErrors()),
      });
    } else if (songs.message) {
      toast.success(songs.message, {
        onClose: () => dispatch(clearMessageAndErrors()),
      });
    }
  }, [dispatch, songs.errors, songs.message]);

  const [dataInput, setDataInput] = useState({});
  const [dataSingers, setDataSingers] = useState({});
  const [dataAuthors, setDataAuthors] = useState({});
  const [dataCategories, setDataCategories] = useState({});
  const [dataAlbums, setDataAlbums] = useState({});
  const handleInputValue = (values) => {
    setDataInput({ ...dataInput, ...values });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    mapObjectToArray(dataSingers);
    const data = {
      ...dataInput,
      singers: mapObjectToArray(dataSingers),
      authors: mapObjectToArray(dataAuthors),
      albums: mapObjectToArray(dataAlbums),
      categories: mapObjectToArray(dataCategories),
    };
    if (isUpdate) {
      dispatch(fetchUpdateSong({ songId: song._id, data }));
    } else {
      dispatch(fetchCreateSong(data));
    }
  };
  return (
    <div>
      <form action="" className="form-controls-songs" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-xl-4">
            <div className="input-group">
              <InputField
                type="text"
                name="name"
                placeholder="Tên bài hát..."
                onChange={handleInputValue}
                fullWidth
                defaultValues={song?.name}
              />
              <InputField
                type="text"
                name="linkMp3"
                placeholder="Link MP3..."
                onChange={handleInputValue}
                fullWidth
                defaultValues={song?.linkMp3}
              />
              <InputField
                type="text"
                name="linkImage"
                placeholder="Link Image..."
                onChange={handleInputValue}
                fullWidth
                defaultValues={song?.linkImage}
              />
            </div>
            <div className="buttons">
              <button type="submit" className="btn btn--full-width btn--blue">
                {isUpdate ? "Cập nhật bài hát" : "Thêm bài hát"}
              </button>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="checkbox-box">
              <h4 className="checkbox-box__heading">Ca Sĩ :</h4>
              {singers.data.map((singer) => {
                return (
                  <CBoxField
                    to="singers"
                    key={singer?._id}
                    label={singer?.name}
                    name={singer?._id}
                    onChange={(values) =>
                      setDataSingers({ ...dataSingers, ...values })
                    }
                    defaultChecked={
                      mapArrayToIdArray(song?.singers).includes(singer?._id) ||
                      false
                    }
                  />
                );
              })}
            </div>
            <div className="checkbox-box">
              <h4 className="checkbox-box__heading">Tác giả :</h4>

              {authors.data.map((author) => {
                return (
                  <CBoxField
                    key={author?._id}
                    label={author?.name}
                    name={author?._id}
                    onChange={(values) =>
                      setDataAuthors({ ...dataAuthors, ...values })
                    }
                    defaultChecked={
                      mapArrayToIdArray(song?.authors).includes(author?._id) ||
                      false
                    }
                  />
                );
              })}
            </div>
            <div className="checkbox-box">
              <h4 className="checkbox-box__heading">Thể loại :</h4>

              {categories.data.map((category) => {
                return (
                  <CBoxField
                    to="categories"
                    key={category?._id}
                    label={category?.name}
                    name={category?._id}
                    onChange={(values) =>
                      setDataCategories({ ...dataCategories, ...values })
                    }
                    defaultChecked={
                      mapArrayToIdArray(song?.categories).includes(
                        category?._id
                      ) || false
                    }
                  />
                );
              })}
            </div>
            <div className="checkbox-box">
              <h4 className="checkbox-box__heading">Albums :</h4>

              {albums.data.map((album) => {
                return (
                  <CBoxField
                    to="albums"
                    key={album?._id}
                    label={album?.name}
                    name={album?._id}
                    onChange={(values) =>
                      setDataAlbums({ ...dataAlbums, ...values })
                    }
                    defaultChecked={
                      mapArrayToIdArray(song?.albums).includes(album?._id) ||
                      false
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormSongControls;
