import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CBoxField from "../../../../components/Form/FormField/CBoxField/index.jsx";
import InputField from "../../../../components/Form/FormField/InputField";
import { fetchAlbums } from "../../../Albums/albumsSlice.js";
import { fetchAuthors } from "../../../Authors/authorsSlice.js";
import { fetchSingers } from "../../../Singers/singersSlice.js";
import { fetchCreateSong, fetchUpdateSong } from "../../songsSlice.js";
import "./styles.scss";

const FormSongControls = (props) => {
  const {
    isUpdate = false,
    song = { singers: [], authors: [], categories: [], albums: [] },
  } = props;
  const dispatch = useDispatch();
  const [dataCheckBox, setDataCheckBox] = useState({
    singers: [],
    authors: [],
    categories: [],
    albums: [],
  });
  const [dataInput, setDataInput] = useState({});

  useEffect(() => {
    dispatch(fetchSingers());
    // dispatch(fetchCategories());
    dispatch(fetchAlbums());
    dispatch(fetchAuthors());
  }, [dispatch]);

  //Set default values Input
  useEffect(() => {
    const { name, linkMp3, linkImage } = song;
    const singers = song.singers.map((item) => item._id);
    const authors = song.authors.map((item) => item._id);
    const categories = song.categories.map((item) => item._id);
    const albums = song.albums.map((item) => item._id);
    setDataInput({ ...dataInput, name, linkMp3, linkImage });
    setDataCheckBox({ singers, authors, categories, albums });
    // setDataSingers(singers);
  }, []);
  const singers = useSelector((state) => state.singers);
  const categories = useSelector((state) => state.categories);
  const albums = useSelector((state) => state.albums);
  const authors = useSelector((state) => state.authors);
  const handleInputValue = (values) => {
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
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...dataInput,
      ...dataCheckBox,
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
                // defaultValues={song?.name}
                value={dataInput?.name}
              />
              <InputField
                type="text"
                name="linkMp3"
                placeholder="Link MP3..."
                onChange={handleInputValue}
                fullWidth
                // defaultValues={song?.linkMp3}
                value={dataInput?.linkMp3}
              />
              <InputField
                type="text"
                name="linkImage"
                placeholder="Link Image..."
                onChange={handleInputValue}
                fullWidth
                // defaultValues={song?.linkImage}
                value={song?.linkImage}
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
                    // name={singer?._id}
                    dataId={singer?._id}
                    name="singers"
                    onChange={(values) =>
                      handleChangeCheckBox("singers", values)
                    }
                    checked={dataCheckBox.singers.includes(singer?._id)}
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
                    name="authors"
                    dataId={author?._id}
                    onChange={(values) =>
                      handleChangeCheckBox("authors", values)
                    }
                    checked={dataCheckBox.authors.includes(author?._id)}
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
                    name="categories"
                    dataId={category?._id}
                    checked={dataCheckBox.categories.includes(category?._id)}
                    onChange={(values) =>
                      handleChangeCheckBox("categories", values)
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
                    name="albums"
                    dataId={album?._id}
                    checked={dataCheckBox.albums.includes(album?._id)}
                    onChange={(values) =>
                      handleChangeCheckBox("albums", values)
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
/**
 * {
 * singers: [1,2,34,5],
 * authors: [2,34,5,6]
 * }
 * setDataCheckBox({[name]: [...dataCheckBox[name],]})
 *
 *
 */
