import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSearch from "../../../CardSearch";
import InputField from "../../../Form/FormField/InputField";
import { fetchSearch } from "./searchSlice";
import "./styles.scss";
const HeaderSearch = (props) => {
  const search = useSelector((state) => state.search);
  const { songs, albums, singers } = search.data;
  const dispatch = useDispatch();
  const handleChangeSearch = ({ keyword }) => {
    dispatch(fetchSearch({ keyword }));
  };
  console.log(`search`, search);

  return (
    <form className="search">
      <div className="search-content">
        <InputField
          placeholder="Nhập từ khóa tìm kiếm..."
          name="keyword"
          onChange={handleChangeSearch}
          className="search-content__input"
          debounce
        />
        {/* <div className="search-results">
          <CardSearch />
        </div> */}
      </div>
      <button
        className="btn btn--primary btn--full-height btn--green btn--search search-btn"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

HeaderSearch.propTypes = {};

export default HeaderSearch;
